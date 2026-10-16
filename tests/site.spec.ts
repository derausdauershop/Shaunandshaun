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
  "/teamwear",
  "/gutscheine",
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

  // Old-URL redirects live in out/.htaccess (static hosting) – see src/lib/static-hosting.test.ts

  test("Absolute Run logo appears on the Siegen store but not on the Betzdorf store body", async ({ page }) => {
    await page.goto("/stores/siegen");
    await expect(page.locator("main").getByRole("img", { name: "Absolute Run Ausdauer" }).first()).toBeVisible();
    await page.goto("/stores/betzdorf");
    await expect(page.locator("main").getByRole("img", { name: "Absolute Run Ausdauer" })).toHaveCount(0);
  });

  test("beginner course shows the spring start instead of a booking link", async ({ page }) => {
    await page.goto("/run-academy/einsteiger-laufkurs");
    await expect(page.getByText("Frühjahr").first()).toBeVisible();
    await expect(page.getByText("8 Wochen")).toBeVisible();
    await expect(page.locator('a[href*="myshopify.com/products/einsteiger-laufkurs"]')).toHaveCount(0);
  });

  test("open status renders for both stores", async ({ page }) => {
    await page.goto("/kontakt");
    await expect(page.locator("main [role=status]")).toHaveCount(2);
  });
});

test("events point to the community app", async ({ page }) => {
  await page.goto("/community");
  await expect(page.locator("#app").getByRole("link", { name: "App Store" })).toHaveAttribute("href", /apps\.apple\.com/);
  await expect(page.locator("#app").getByRole("link", { name: "Google Play" })).toHaveAttribute("href", /play\.google\.com/);
  await expect(page.getByRole("navigation").getByRole("link", { name: "Events" })).toHaveCount(0);
});

test("teamwear page shows the club crests and turns a jersey", async ({ page }) => {
  await page.goto("/teamwear");
  for (const club of ["SG 06 Betzdorf", "TuS Weitefeld", "JSG Weitefeld-Neunkhausen", "Sportfreunde Daaden", "VfB Niederdreisbach"]) {
    await expect(page.getByRole("img", { name: `Wappen ${club}` })).toBeVisible();
  }
  await page.getByRole("button", { name: "Rückseite", exact: true }).first().click();
  // the toggle now offers the front again and reports its pressed state
  await expect(page.getByRole("button", { name: "Vorderseite", exact: true }).first()).toHaveAttribute("aria-pressed", "true");
});

test("voucher page offers amounts and checks the gift fields", async ({ page }) => {
  await page.goto("/gutscheine");
  await expect(page.getByRole("radio", { name: "50 €", exact: true })).toBeChecked();
  await page.getByText("25 €", { exact: true }).click();
  await expect(page.getByRole("button", { name: /Jetzt kaufen · 25 €/ })).toBeVisible();
  await page.getByRole("button", { name: /Direkt verschenken/ }).click();
  await page.getByLabel("Name der beschenkten Person").fill("Lena");
  await expect(page.getByText("Für Lena")).toBeVisible();
  await page.getByLabel("E-Mail der beschenkten Person *").fill("keine-adresse");
  await page.getByRole("button", { name: /Jetzt kaufen/ }).click();
  await expect(page.getByText("Bitte gib eine gültige E-Mail-Adresse der beschenkten Person an.")).toBeVisible();
});

test("voucher buttons point to the voucher page", async ({ page }) => {
  await page.goto("/");
  await expect(page.locator("header").getByRole("link", { name: "Gutschein" })).toHaveAttribute("href", /^\/gutscheine\/?$/);
});

test("voucher purchase creates a Shopify cart from the browser and opens the checkout", async ({ page }) => {
  let lines: unknown;
  await page.route("**/api/2025-07/graphql.json", async (route) => {
    lines = route.request().postDataJSON().variables.lines;
    await route.fulfill({ json: { data: { cartCreate: { cart: { checkoutUrl: "https://checkout.example/cart/c/test" }, userErrors: [] } } } });
  });
  await page.route("https://checkout.example/**", (route) => route.fulfill({ body: "<h1>Kasse</h1>", contentType: "text/html" }));
  await page.goto("/gutscheine");
  await page.getByText("100 €", { exact: true }).click();
  await page.getByRole("button", { name: /Jetzt kaufen · 100 €/ }).click();
  await expect(page).toHaveURL("https://checkout.example/cart/c/test");
  expect(lines).toEqual([{ merchandiseId: "gid://shopify/ProductVariant/58267034812803", quantity: 1, attributes: [] }]);
});
