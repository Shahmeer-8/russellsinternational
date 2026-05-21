import { expect, request, test } from "@playwright/test";

const apiBase = "http://127.0.0.1:8000/api/v1";

const getEndpoints = [
  "/hero-slides",
  "/ticker-items",
  "/stats",
  "/services",
  "/why-choose-us",
  "/courses",
  "/courses?type=paid",
  "/courses?type=navttc",
  "/study-destinations",
  "/language-programs",
  "/jobs",
  "/jobs?type=Full-Time",
  "/jobs?search=test",
  "/internships",
  "/events",
  "/events?type=event",
  "/events?type=news",
  "/events?featured=true",
  "/gallery",
  "/gallery?category=campus",
  "/testimonials",
  "/testimonials?type=written",
  "/testimonials?type=video",
  "/team",
  "/settings",
  "/settings?group=contact",
  "/navigation",
];

test.describe("live public API", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "API request smoke tests only need one browser project.");

  for (const endpoint of getEndpoints) {
    test(`GET ${endpoint}`, async () => {
      const context = await request.newContext({ extraHTTPHeaders: { Accept: "application/json" } });
      const response = await context.get(`${apiBase}${endpoint}`);
      expect(response.status(), await response.text()).toBe(200);
      expect(response.headers()["content-type"]).toContain("application/json");
      const body = await response.json();
      expect(body.success).toBe(true);
      expect(body).toHaveProperty("data");
      await context.dispose();
    });
  }

  test("detail endpoints return valid data for first active records and JSON 404 for missing records", async () => {
    const context = await request.newContext({ extraHTTPHeaders: { Accept: "application/json" } });

    for (const collection of ["/services", "/courses", "/study-destinations", "/language-programs", "/jobs", "/internships", "/events"]) {
      const listResponse = await context.get(`${apiBase}${collection}`);
      const listBody = await listResponse.json();
      const first = Array.isArray(listBody.data) ? listBody.data[0] : listBody.data?.data?.[0];
      if (first?.id) {
        const detailResponse = await context.get(`${apiBase}${collection}/${first.id}`);
        expect(detailResponse.status(), `${collection}/${first.id}`).toBe(200);
        expect((await detailResponse.json()).success).toBe(true);
      }

      const missingResponse = await context.get(`${apiBase}${collection}/999999999`);
      expect(missingResponse.status()).toBe(404);
      expect((await missingResponse.json()).success).toBe(false);
    }

    const settings = await context.get(`${apiBase}/settings`);
    const settingsBody = await settings.json();
    const firstKey = Object.keys(settingsBody.data ?? {})[0];
    if (firstKey) {
      const settingResponse = await context.get(`${apiBase}/settings/${firstKey}`);
      expect(settingResponse.status()).toBe(200);
    }

    const pages = ["about", "skills", "study-abroad", "languages", "careers", "events"];
    for (const slug of pages) {
      const pageResponse = await context.get(`${apiBase}/pages/${slug}`);
      expect([200, 404]).toContain(pageResponse.status());
      expect(pageResponse.headers()["content-type"]).toContain("application/json");

      const sectionsResponse = await context.get(`${apiBase}/pages/${slug}/sections`);
      expect([200, 404]).toContain(sectionsResponse.status());
      expect(sectionsResponse.headers()["content-type"]).toContain("application/json");
    }

    const invalidRoute = await context.get(`${apiBase}/does-not-exist`);
    expect(invalidRoute.status()).toBe(404);
    expect((await invalidRoute.json()).success).toBe(false);

    await context.dispose();
  });

  test("POST form validation and uploads", async () => {
    const context = await request.newContext({ extraHTTPHeaders: { Accept: "application/json" } });

    const invalidContact = await context.post(`${apiBase}/contact`, { data: { email: "bad" } });
    expect(invalidContact.status()).toBe(422);
    expect((await invalidContact.json()).success).toBe(false);

    const invalidCareer = await context.post(`${apiBase}/careers/apply`, { data: { application_type: "bad", email: "bad" } });
    expect(invalidCareer.status()).toBe(422);
    expect((await invalidCareer.json()).success).toBe(false);

    await context.dispose();
  });
});
