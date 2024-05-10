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

test("Should show hotel search results",async({page})=>{
await page.goto(UI_URL);

await page.getByPlaceholder("Where are your going").fill("Dublin");
await page.getByRole("button",{name:"Search"}).click();

await expect(page.getByAltText("Hotels found in Dublin")).toBeVisible();
await expect(page.getByAltText("Dublin Getaways")).toBeVisible();
})