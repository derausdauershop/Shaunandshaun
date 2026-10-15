import { expect, test } from "@playwright/test";

const ROUTES = [
  "/",
  "/laufanalyse",
  "/stores",
  "/stores/betzdorf",
  "/stores/siegen",
  "/run-academy",
  "/run-academy/einsteiger-laufkurs",
  "/ausdauer-cup",
  "/ausdauer-cup/herdorfer-goetzelauf",
  "/community",
  "/events",
  "/magazin",
  "/magazin/dehnuebungen-fuer-laeufer",
  "/ueber-uns",
  "/jobs",
  "/kontakt",
  "/impressum",
  "/datenschutz",
];

test.describe("website", () => {
  for (const route of ROUTES) {
    test(`${route} loads with one h1 and no horizontal scroll`, async ({ page }) => {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("h1")).toHaveCount(1);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      expect(overflow).toBeLessThanOrEqual(0);
    });
  }

  test("old URLs redirect to the new pages", async ({ page }) => {
    await page.goto("/blog/stretch-it-out");
    await expect(page).toHaveURL(/\/magazin\/dehnuebungen-fuer-laeufer$/);
    await page.goto("/eventleser/herdorfer-goetzelauf-2");
    await expect(page).toHaveURL(/\/ausdauer-cup\/herdorfer-goetzelauf$/);
  });

  test("Absolute Run logo appears on the Siegen store but not on the Betzdorf store body", async ({ page }) => {
    await page.goto("/stores/siegen");
    await expect(page.locator("main").getByRole("img", { name: "Absolute Run Ausdauer" }).first()).toBeVisible();
    await page.goto("/stores/betzdorf");
    await expect(page.locator("main").getByRole("img", { name: "Absolute Run Ausdauer" })).toHaveCount(0);
  });

  test("course page links to the Shopify booking", async ({ page }) => {
    await page.goto("/run-academy/einsteiger-laufkurs");
    await expect(page.getByRole("link", { name: "Jetzt anmelden" })).toHaveAttribute("href", /myshopify\.com\/products\/einsteiger-laufkurs/);
  });

  test("open status renders for both stores", async ({ page }) => {
    await page.goto("/kontakt");
    await expect(page.locator("main [role=status]")).toHaveCount(2);
  });
});
