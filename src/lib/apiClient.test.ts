import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { api } from "./apiClient";

describe("api client", () => {
  const fetchMock = vi.fn();

  beforeEach(() => {
    fetchMock.mockReset();
    vi.stubGlobal("fetch", fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("builds the API v1 base URL from VITE_API_URL and parses JSON", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({ success: true, data: { id: 1 } }),
    });

    await expect(api.get("/settings")).resolves.toEqual({ success: true, data: { id: 1 } });
    expect(fetchMock).toHaveBeenCalledWith("http://localhost:8000/api/v1/settings", expect.any(Object));
  });

  it("normalizes local media URLs inside nested API payloads", async () => {
    fetchMock.mockResolvedValue({
      ok: true,
      json: async () => ({
        success: true,
        data: {
          image_url: "/storage/gallery/photo.jpg",
          nested: [{ cv_url: "http://127.0.0.1:8000/storage/applications/cv.pdf" }],
        },
      }),
    });

    await expect(api.get("/gallery")).resolves.toMatchObject({
      data: {
        image_url: "http://localhost:8000/storage/gallery/photo.jpg",
        nested: [{ cv_url: "http://localhost:8000/storage/applications/cv.pdf" }],
      },
    });
  });

  it("throws frontend-friendly API errors", async () => {
    fetchMock.mockResolvedValue({
      ok: false,
      statusText: "Unprocessable Content",
      json: async () => ({ success: false, message: "Validation failed." }),
    });

    await expect(api.post("/contact", {})).rejects.toThrow("Validation failed.");
  });
});
