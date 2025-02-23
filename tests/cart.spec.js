const { test, expect } = require("@playwright/test");

let context;
let page;
let acceptCookiesButton;
let showCartModalButton;
let emptyCartMessage;

test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();

  acceptCookiesButton = page.locator('#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll');
  showCartModalButton = page.locator('#unity_modal_179_opener');
  emptyCartMessage = page.locator("div[id='cart_status_cart_slide_id_desktop_content'] p[class='cart-empty-message']");

});

test.afterEach(async () => {
  await context.close();
});

// Test a cart, when a cart is empty
test("Empty cart state", async () => {
    await page.goto('https://www.baldai1.lt/');
    await acceptCookiesButton.click();
    await showCartModalButton.click();
    await expect(emptyCartMessage).toContainText('Jūsų prekių krepšelis yra tuščias');
});