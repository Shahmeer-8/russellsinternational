import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type React from "react";
import { MemoryRouter } from "react-router-dom";
import { describe, expect, it, vi } from "vitest";
import ContactSection from "./ContactSection";

const renderWithClient = (ui: React.ReactElement, route = "/") => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  // The form reads ?about= to know which programme the visitor arrived from, so
  // it needs a router even in the tests that do not exercise that.
  return render(
    <MemoryRouter initialEntries={[route]}>
      <QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>
    </MemoryRouter>,
  );
};

describe("ContactSection", () => {
  it("renders contact settings and handles a successful submit", async () => {
    const fetchMock = vi.fn((url: string) => {
      if (url.endsWith("/settings?group=contact")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({ success: true, data: { phone: "+92 300 0000000", email: "info@example.com", address: "Islamabad" } }),
        });
      }

      return Promise.resolve({
        ok: true,
        json: async () => ({ success: true, message: "Thanks" }),
      });
    });
    vi.stubGlobal("fetch", fetchMock);

    renderWithClient(<ContactSection />);

    expect(await screen.findByText("+92 300 0000000")).toBeInTheDocument();
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "test@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => expect(screen.getByText(/message sent/i)).toBeInTheDocument());
    vi.unstubAllGlobals();
  });

  it("shows API errors without crashing", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({
      ok: false,
      json: async () => ({ success: false, message: "Validation failed." }),
    }));

    renderWithClient(<ContactSection />);
    fireEvent.change(screen.getByLabelText(/full name/i), { target: { value: "Test User" } });
    fireEvent.change(screen.getByLabelText(/email address/i), { target: { value: "test@example.com" } });
    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent("Validation failed.");
    vi.unstubAllGlobals();
  });
});

/**
 * Arriving from a programme's details panel carries the programme with you.
 *
 * Without this the "Inquire Now" button dropped the visitor on a blank form and
 * made them describe what they had just been reading — and on four of the five
 * pages that button went nowhere at all, because the form only exists on the
 * home page.
 */
describe("ContactSection enquiry context", () => {
  const stubSettings = () =>
    vi.stubGlobal(
      "fetch",
      vi.fn(() =>
        Promise.resolve({ ok: true, json: async () => ({ success: true, data: {} }) }),
      ),
    );

  it("names the programme, preselects it and starts the message off", async () => {
    stubSettings();

    renderWithClient(<ContactSection />, "/?about=IELTS%20Preparation#contact");

    // The chip above the form, not the <option> of the same name.
    expect(await screen.findByText(/enquiring about/i)).toBeInTheDocument();
    expect(screen.getByRole("combobox")).toHaveValue("IELTS Preparation");
    expect(screen.getByLabelText(/your message/i)).toHaveValue(
      "I'd like to know more about IELTS Preparation.",
    );
    vi.unstubAllGlobals();
  });

  it("leaves the form untouched when arriving without a programme", async () => {
    stubSettings();

    renderWithClient(<ContactSection />);

    const select = await screen.findByRole("combobox");
    expect(select).toHaveValue("");
    expect(screen.getByLabelText(/your message/i)).toHaveValue("");
    vi.unstubAllGlobals();
  });

  it("lets the visitor drop the programme again", async () => {
    stubSettings();

    renderWithClient(<ContactSection />, "/?about=Study%20in%20Canada#contact");

    fireEvent.click(await screen.findByLabelText(/clear the programme/i));

    await waitFor(() => expect(screen.queryByText(/enquiring about/i)).not.toBeInTheDocument());
    expect(screen.getByLabelText(/your message/i)).toHaveValue("");
  });
});
