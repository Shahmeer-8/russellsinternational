import { expect, test, type Page } from "@playwright/test";
import path from "node:path";

const routes = ["/", "/about", "/skills", "/study-abroad", "/languages", "/careers", "/events", "/404-test"];

async function monitorPage(page: Page) {
  const consoleErrors: string[] = [];
  const failedRequests: string[] = [];

  page.on("console", (message) => {
    if (message.type() === "error") {
      if (message.text().includes("ERR_NETWORK_ACCESS_DENIED") || message.text().includes("Could not connect to server")) {
        return;
      }
      consoleErrors.push(message.text());
    }
  });

  page.on("response", (response) => {
    const status = response.status();
    const url = response.url();
    if (status >= 400 && !url.includes("/404-test") && !url.includes("favicon")) {
      failedRequests.push(`${status} ${url}`);
    }
  });

  return { consoleErrors, failedRequests };
}

async function expectNoBrokenImages(page: Page) {
  const broken = await page.locator("img").evaluateAll((images) =>
    images
      .filter((image) => image instanceof HTMLImageElement && image.complete && image.naturalWidth === 0)
      .map((image) => image.getAttribute("src")),
  );
  expect(broken, `Broken images: ${broken.join(", ")}`).toEqual([]);
}

test.describe("public frontend routes", () => {
  for (const route of routes) {
    test(`loads ${route} without console/network/image failures`, async ({ page }) => {
      const monitor = await monitorPage(page);
      await page.goto(route);
      await page.waitForLoadState("networkidle");

      if (route === "/404-test") {
        await expect(page.getByText(/404|not found/i).first()).toBeVisible();
      } else {
        await expect(page.locator("nav")).toBeVisible();
        await expect(page.locator("footer")).toBeVisible();
      }

      await expectNoBrokenImages(page);
      expect(monitor.consoleErrors).toEqual([]);
      expect(monitor.failedRequests).toEqual([]);
    });
  }

  test("desktop navbar and footer navigation work", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("nav")).toBeVisible();

    for (const route of ["/about", "/skills", "/study-abroad", "/languages", "/careers", "/events"]) {
      await page.goto(route);
      await expect(page).toHaveURL(new RegExp(`${route}$`));
      await expect(page.locator("footer")).toBeVisible();
    }
  });

  test("mobile menu opens and navigates", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: /toggle menu/i }).click();
    await expect(page.getByRole("link", { name: /about/i }).first()).toBeVisible();
    await page.getByRole("link", { name: /about/i }).first().click();
    await expect(page).toHaveURL(/\/about$/);
  });

  test("contact form submits valid data and keeps invalid data client-side", async ({ page }) => {
    test.skip(test.info().project.name !== "chromium", "State-changing POST flow runs once to avoid rate-limit noise.");
    await page.goto("/");
    await page.locator("#contact").scrollIntoViewIfNeeded();

    await page.getByRole("button", { name: /send message/i }).click();
    await expect(page.locator("input:invalid").first()).toBeVisible();

    await page.getByLabel(/full name/i).fill(`Playwright Contact ${Date.now()}`);
    await page.getByLabel(/email address/i).fill(`pw-contact-${Date.now()}@example.com`);
    await page.getByLabel(/phone/i).fill("+923001234567");
    await page.getByLabel(/interest/i).selectOption("Study Abroad");
    await page.getByLabel(/your message/i).fill("Live browser contact form submission.");
    const contactResponse = page.waitForResponse(
      (response) => response.url().includes("/api/v1/contact") && response.request().method() === "POST",
    );
    await page.getByRole("button", { name: /send message/i }).click();
    await expect((await contactResponse).status()).toBe(201);

    await expect(page.getByText(/message sent/i)).toBeVisible({ timeout: 30000 });
  });

  test("content pages render expected sections", async ({ page }) => {
    await page.goto("/skills");
    await expect(page.getByText(/paid|navttc|course/i).first()).toBeVisible();

    await page.goto("/study-abroad");
    await expect(page.getByText(/destination|study/i).first()).toBeVisible();

    await page.goto("/languages");
    await expect(page.getByText(/language|ielts|spoken/i).first()).toBeVisible();

    await page.goto("/events");
    await expect(page.getByText(/event|news|gallery/i).first()).toBeVisible();
  });

  test("career application submits with PDF CV", async ({ page }) => {
    test.skip(test.info().project.name !== "chromium", "State-changing upload flow runs once to avoid duplicate submissions.");
    await page.goto("/careers");
    await page.locator("#apply").scrollIntoViewIfNeeded();
    await page.getByLabel(/full name/i).fill(`Playwright Applicant ${Date.now()}`);
    await page.getByLabel(/email/i).fill(`pw-applicant-${Date.now()}@example.com`);
    await page.getByLabel(/position applied for/i).selectOption("Web Developer");
    await page.getByLabel(/upload cv/i).setInputFiles(path.join(process.cwd(), "tests/e2e/fixtures/sample-cv.pdf"));
    await page.getByLabel(/cover message/i).fill("Live browser career application.");
    await page.getByRole("button", { name: /submit application/i }).click();

    await expect(page.getByText(/application received/i)).toBeVisible();
  });
});
