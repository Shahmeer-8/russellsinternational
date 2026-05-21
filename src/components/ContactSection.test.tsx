import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type React from "react";
import { describe, expect, it, vi } from "vitest";
import ContactSection from "./ContactSection";

const renderWithClient = (ui: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false }, mutations: { retry: false } },
  });

  return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
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
