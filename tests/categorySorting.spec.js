const { test, expect } = require("@playwright/test");

let context;
let page;
let acceptCookiesButton;
let sortDropdownButton;
let cheapestOption;
let mostExpensiveOption;
let productPrice;
let productCountButton;
const quantityEqualTo48 = 48;
const quantityEqualTo24 = 24;
const quantityEqualTo96 = 96;
let show24ProductsSelection;
let show96ProductsSelection;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();

  acceptCookiesButton = page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
  sortDropdownButton = page.locator('#sw_elm_sort_fields');
  cheapestOption = page.locator('.sort-by-price-asc.ty-sort-dropdown__content-item');
  mostExpensiveOption = page.locator('.sort-by-price-desc.ty-sort-dropdown__content-item');
  productPrice = page.locator('//span[@class="ty-price"]/span[@class="ty-price-num"][1]');
  productCountButton = page.locator('#sw_elm_pagination_steps');
  show24ProductsSelection = page.getByRole('link', { name: '24 prekės' });
  show96ProductsSelection = page.getByRole('link', { name: '96 prekės' });
});

test.afterEach(async () => {
  await context.close();
});

// Sorting dropdown has correct default value
test("Sorting dropdown default value is Rekomenduojami viršuje", async () => {
    await page.goto('https://www.baldai1.lt/miegamojo-baldai/miegamojo-lovos/');
    await acceptCookiesButton.click();
    await expect(sortDropdownButton).toHaveText('Rekomenduojami viršuje');
});

// Prices are sorted correctly from lowest to highest
test("Prices are sorted correctly from lowest to highest", async () => {
  await page.goto('https://www.baldai1.lt/miegamojo-baldai/miegamojo-lovos/');
  await acceptCookiesButton.click();
  await sortDropdownButton.click();
  await cheapestOption.click();
  await expect(sortDropdownButton).toHaveText('Pigiausi viršuje');
  let productPricesArray = await productPrice.allTextContents();
  productPricesArray = productPricesArray.map(value => parseInt(value));
  productPricesArray.forEach((value, index) => {
    if (index < productPricesArray.length - 1) {
      expect(value).toBeLessThanOrEqual(productPricesArray[index + 1]);
    }
  });
});

// Prices are sorted correctly from highest to lowest
test("Prices are sorted correctly from highest to lowest", async () => {
  await page.goto('https://www.baldai1.lt/miegamojo-baldai/miegamojo-lovos/');
  await acceptCookiesButton.click();
  await sortDropdownButton.click();
  await mostExpensiveOption.click();
  await expect(sortDropdownButton).toHaveText('Brangiausi viršuje');
  let productPricesArray = await productPrice.allTextContents();
  productPricesArray = productPricesArray.map(value => parseInt(value));
  productPricesArray.forEach((value, index) => {
    if (index < productPricesArray.length - 1) {
      expect(value).toBeGreaterThanOrEqual(productPricesArray[index + 1]);
    }
  });
});

// Default view shows 48 products and correct selection
test("Default view shows 48 products and correct selection", async () => {
  await page.goto('https://www.baldai1.lt/miegamojo-baldai/miegamojo-lovos/');
  await acceptCookiesButton.click();
  await expect(productCountButton).toHaveText('48 prekės');
  await expect(productPrice).toHaveCount(quantityEqualTo48);
});

// Selecting 24 products shows 24 products
test("Selecting 24 products shows 24 products", async () => {
  await page.goto('https://www.baldai1.lt/miegamojo-baldai/miegamojo-lovos/');
  await acceptCookiesButton.click();
  await productCountButton.click();
  await show24ProductsSelection.click();
  await expect(productPrice).toHaveCount(quantityEqualTo24);
});

// Selecting 96 products shows 96 products
test("Selecting 96 products shows 96 products", async () => {
  await page.goto('https://www.baldai1.lt/miegamojo-baldai/miegamojo-lovos/');
  await acceptCookiesButton.click();
  await productCountButton.click();
  await show96ProductsSelection.click();
  await expect(productPrice).toHaveCount(quantityEqualTo96);
});