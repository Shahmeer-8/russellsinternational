import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type React from "react";
import { describe, expect, it, vi } from "vitest";
import CareerApplyForm from "./CareerApplyForm";

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

describe("CareerApplyForm", () => {
  it("allows submit without optional phone, cover letter, or CV", async () => {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, message: "Submitted" }),
    });
    vi.stubGlobal("fetch", fetchMock);

    renderWithClient(<CareerApplyForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Test Applicant" } });
    fireEvent.change(screen.getByLabelText(/email/i), { target: { value: "applicant@example.com" } });
    fireEvent.change(screen.getByLabelText(/position applied for/i), { target: { value: "Internship — General" } });
    fireEvent.click(screen.getByRole("button", { name: /submit application/i }));

    await waitFor(() => expect(screen.getByText(/application received/i)).toBeInTheDocument());

    // The form also fetches the open jobs and internships to fill its dropdown,
    // so the submission is no longer the first request out.
    const submission = fetchMock.mock.calls.find(([, init]) => init?.method === "POST");
    expect(submission, "no POST request was made").toBeTruthy();
    const [, request] = submission!;
    expect(request.body).toContain('"application_type":"internship"');
    expect(request.body).toContain('"position_title":"Internship — General"');
    vi.unstubAllGlobals();
  });
});

/**
 * The dropdown reads two paginated endpoints, whose rows sit at data.data. Reading
 * one level too shallow put .map on the paginator object, which threw during render
 * and took every page of the site white — and the test above did not catch it,
 * because its mock answered every request with a body that had no data at all.
 *
 * This one answers with the shape the API really returns.
 */
describe("CareerApplyForm position dropdown", () => {
  const paginated = (rows: unknown[]) => ({
    success: true,
    data: { data: rows, current_page: 1, last_page: 1, per_page: 15, total: rows.length },
  });

  const mockEndpoints = () => {
    const fetchMock = vi.fn().mockImplementation((url: string) => {
      const body = url.includes("/jobs")
        ? paginated([{ id: 1, title: "Admissions Officer" }])
        : url.includes("/internships")
          ? paginated([{ id: 2, title: "Summer Data Intern" }])
          : { success: true, message: "Submitted" };

      return Promise.resolve({ ok: true, json: async () => body });
    });

    vi.stubGlobal("fetch", fetchMock);
    return fetchMock;
  };

  it("lists the live openings rather than a hardcoded array", async () => {
    mockEndpoints();

    renderWithClient(<CareerApplyForm />);

    const select = screen.getByLabelText(/position applied for/i);
    await waitFor(() =>
      expect([...select.querySelectorAll("option")].map((o) => o.textContent)).toContain(
        "Summer Data Intern",
      ),
    );

    const options = [...select.querySelectorAll("option")].map((o) => o.textContent);
    expect(options).toContain("Admissions Officer");
    // Still offered, for anyone applying speculatively.
    expect(options).toContain("Other");
    // The hardcoded list is a fallback only; real openings replace it.
    expect(options).not.toContain("AI/ML Engineer");
    vi.unstubAllGlobals();
  });

  it("renders the form when the openings come back empty", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({ ok: true, json: async () => paginated([]) }),
    );

    renderWithClient(<CareerApplyForm />);

    await waitFor(() => expect(screen.getByLabelText(/position applied for/i)).toBeInTheDocument());
    vi.unstubAllGlobals();
  });
});
