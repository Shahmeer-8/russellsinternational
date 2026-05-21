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

    const [, request] = fetchMock.mock.calls[0];
    expect(request.body).toContain('"application_type":"internship"');
    expect(request.body).toContain('"position_title":"Internship — General"');
    vi.unstubAllGlobals();
  });
});
