import { test, expect } from "@playwright/test";
import path from "path"
const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({ page }) => {
  await page.goto(UI_URL);
  await page.getByRole("link", { name: "Sign In" }).click();
  await expect(page.getByRole("heading", { name: "Sign In" })).toBeVisible();
  await page.locator("[name=email]").fill("testuser@gmail.com");
  await page.locator("[name=password]").fill("password");
  await page.getByRole("button", { name: "Login" }).click();
  await expect(page.getByText("Sign in Sucessful")).toBeVisible();
});

test("should allow user to add a hotel", async ({ page }) => {
  await page.goto(`${UI_URL}add-hotel`);
  await page.locator("[name=name]").fill("Test Hotel");
  await page.locator("[name=city]").fill("Test City");
  await page.locator("[name=country]").fill("Test Country");
  await page
    .locator("[name=description]")
    .fill("This is random hotel test description");
  await page.locator('[name="pricePerNight"]').fill("200");
  await page.selectOption('select[name="starRating"]', "4");
  await page.getByText("Business").click();
  await page.getByLabel("Fitness Center").check();
  await page.getByLabel("Spa").check();
  await page.getByLabel("Free WiFi").check();
  await page.locator('[name="adultCount"]').fill("2");
  await page.locator('[name="childCount"]').fill("3");


  await page.setInputFiles('[name="imageFiles"]', [
    path.join(__dirname, "files", "test_1.jpg"),
    path.join(__dirname, "files", "test_2.jpg"),
  ])

  await page.getByRole('button', { name: "Save" }).click()
  await expect(page.getByText("Hotel has been added")).toBeVisible();


});

test("should display hotels", async ({ page }) => {
  await page.goto(`${UI_URL}my-hotels`);

  await expect(page.getByText("Dublin Getaways")).toBeVisible();
  await expect(page.getByText("Lorem ipsum dolor sit amet")).toBeVisible();
  await expect(page.getByText("Dublin, Ireland")).toBeVisible();
  await expect(page.getByText("All Inclusive")).toBeVisible();
  await expect(page.getByText("$119 per night")).toBeVisible();
  await expect(page.getByText("2 adults, 3 children")).toBeVisible();
  await expect(page.getByText("2 Star Rating")).toBeVisible();

  await expect(
    page.getByRole("link", { name: "View Details" }).first()
  ).toBeVisible();
  await expect(page.getByRole("link", { name: "Add Hotel" })).toBeVisible();
});