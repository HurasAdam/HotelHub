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


test("Should show hotel detail",async({page})=>{
  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going").fill("Dublin");
  await page.getByRole("button",{name:"Search"}).click();

  await page.getByAltText("Dublin Getaways").click();
  await expect(page).toHaveURL(/detail/);
  await expect(page.getByRole("button",{name:"Book now"})).toBeVisible();
})

test("should book hotel",async({page})=>{

  await page.goto(UI_URL);

  await page.getByPlaceholder("Where are you going").fill("Dublin");

const date = new Date();
date.setDate(date.getDate()+3);
const formattedDate= date.toISOString().split("T")[0];
await page.getByPlaceholder("Check-out Date").fill(formattedDate);

  await page.getByRole("button",{name:"Search"}).click();

  await page.getByAltText("Dublin Getaways").click();
  await expect(page).toHaveURL(/detail/);
  await page.getByRole("button",{name:"Book now"}).click();

  await expect(page.getByText("Total Cost : 300$ ")).toBeVisible();

  const stripeFrame = page.frameLocator("iFrame").first();
  await stripeFrame.locator('[placeholder="Card number"]').fill("424242424242424242")
await stripeFrame.locator('[placeholder="MM / YY"]').fill("12/30");
await stripeFrame.locator('[placeholder="CVC"]').fill("243");
await stripeFrame.locator('[placeholder="ZIP"]').fill("23124");

await page.getByRole("button",{name:"Confirm Booking"}).click();
await expect(page.getByText("Booking Saved!")).toBeVisible();


})