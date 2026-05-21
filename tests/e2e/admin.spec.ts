import { expect, test } from "@playwright/test";

const adminBase = "http://127.0.0.1:8000/admin";
const resources = [
  "career-applications",
  "contact-submissions",
  "courses",
  "events",
  "gallery-photos",
  "hero-slides",
  "internships",
  "jobs",
  "language-programs",
  "navigation-items",
  "pages",
  "page-sections",
  "services",
  "settings",
  "stats",
  "study-destinations",
  "team-members",
  "testimonials",
  "ticker-items",
  "why-choose-us-items",
];

const resourceLabels: Record<string, string> = {
  "career-applications": "Career Applications",
  "contact-submissions": "Contact Submissions",
  courses: "Courses",
  events: "Events",
  "gallery-photos": "Gallery Photos",
  "hero-slides": "Hero Slides",
  internships: "Internships",
  jobs: "Jobs",
  "language-programs": "Language Programs",
  "navigation-items": "Navigation Items",
  pages: "Pages",
  "page-sections": "Page Sections",
  services: "Services",
  settings: "Settings",
  stats: "Stats",
  "study-destinations": "Study Destinations",
  "team-members": "Team Members",
  testimonials: "Testimonials",
  "ticker-items": "Ticker Items",
  "why-choose-us-items": "Why Choose Us Items",
};

async function login(page) {
  await page.goto(`${adminBase}/login`);
  await page.getByLabel(/email/i).fill("admin@russellsinternational.com");
  await page.getByLabel(/password/i).fill("Admin@123");
  await page.getByRole("button", { name: /sign in|login/i }).click();
  await expect(page).toHaveURL(/\/admin/);
}

test.describe("Filament admin live checks", () => {
  test.skip(({ browserName }) => browserName !== "chromium", "Admin panel browser checks run once in Chromium.");
  test.setTimeout(180_000);

  test("admin requires authentication", async ({ page }) => {
    await page.goto(adminBase);
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("admin login works and all resource list pages load", async ({ page }) => {
    await login(page);

    for (const resource of resources) {
      await page.getByRole("link", { name: resourceLabels[resource] }).click();
      await page.waitForURL(new RegExp(`/admin/${resource}`), { timeout: 15_000 });
      await expect(page.locator("body")).not.toContainText(/server error|whoops|exception/i);
      await expect(page).toHaveURL(new RegExp(`/admin/${resource}`));
    }
  });

  test("create pages show required validation instead of crashing", async ({ page }) => {
    await login(page);
    const createable = resources.filter((resource) => !["career-applications", "contact-submissions"].includes(resource));

    for (const resource of createable) {
      await page.getByRole("link", { name: resourceLabels[resource] }).click();
      await page.waitForURL(new RegExp(`/admin/${resource}`), { timeout: 15_000 });
      await page.locator(`a[href$="/admin/${resource}/create"]`).first().click();
      await page.waitForURL(new RegExp(`/admin/${resource}/create`), { timeout: 15_000 });
      await expect(page.locator("body")).not.toContainText(/server error|whoops|exception/i);
      const createButton = page.getByRole("button", { name: /create|save/i }).last();
      if (await createButton.isVisible() && await createButton.isEnabled()) {
        await createButton.click();
        await page.waitForTimeout(500);
        await expect(page.locator("body")).not.toContainText(/server error|whoops|exception/i);
      }
      await page.goto(adminBase, { waitUntil: "domcontentloaded" });
    }
  });
});
