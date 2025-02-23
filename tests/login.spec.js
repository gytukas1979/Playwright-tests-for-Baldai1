const { test, expect } = require("@playwright/test");

let context;
let page;
const correctEmail = "gytistestavicius2@gmail.com";
const correctPassword = "Test1234!";
let acceptCookiesButton;
let showLoginModalButtonIncognito;
let prisijungtiButtonUnityModal;
let mailInput;
let passwordInput;
let prisijungtiButtonLoginWindow;
let successfulLoginNotification;
let userProfileButton;
let atsijungtiButton;
let profileDescription;
let loginFailureNotification;
let emailLoginErrorMessage;
let passwordLoginErrorMessage;



test.beforeEach(async ({ browser }) => {
  context = await browser.newContext();
  page = await context.newPage();

  acceptCookiesButton = page.locator("#CybotCookiebotDialogBodyLevelButtonLevelOptinAllowAll");
  showLoginModalButtonIncognito = page.locator(".profiles-modal.hide-mob.not-logged-in");
  prisijungtiButtonUnityModal = page.locator('//a[text()="Prisijungti"]');
  mailInput = page.locator("#login_main_login");
  passwordInput = page.locator("#psw_main_login");
  prisijungtiButtonLoginWindow = page.locator("button.ty-btn__login.ty-btn__secondary.ty-btn");
  successfulLoginNotification = page.locator(".cm-notification-content.notification-content.cm-auto-hide.alert-success");
  userProfileButton = page.locator("#unity_modal_profiles_opener");
  atsijungtiButton = page.locator(".ty-btn.ty-btn__primary.profile-");
  profileDescription = page.locator(".profile_description");
  loginFailureNotification = page.locator(".cm-notification-content.notification-content.alert-error");
  emailLoginErrorMessage = page.locator('#login_main_login_error_message');
  passwordLoginErrorMessage = page.locator('#psw_main_login_error_message');
});

test.afterEach(async () => {
  await context.close();
});

async function login(email, password) {
  await page.goto('https://www.baldai1.lt/');
  await acceptCookiesButton.click();
  await showLoginModalButtonIncognito.click();
  await prisijungtiButtonUnityModal.click();
  await mailInput.fill(email);
  await passwordInput.fill(password);
  await prisijungtiButtonLoginWindow.click();
}
// Successful login test: Correct email and password.
test("Successful login test", async () => {
  await login(correctEmail, correctPassword);
  const successNotificationText = await successfulLoginNotification.innerText();
  expect(successNotificationText).toContain('Jūs sėkmingai prisijungėte prie savo paskyros.');
});

// Successful login/logout test
test("Successful logout test", async () => {
  await login(correctEmail, correctPassword);
  await userProfileButton.click();
  await atsijungtiButton.click();
  await showLoginModalButtonIncognito.click();
  await expect(profileDescription).toContainText('Prisijunkite arba registruokitės ir matykite visą savo užsakymų suvestinę vienoje vietoje');
});

// Unsuccessful login: correct email, wrong password
test("Unsuccessful login, correct email, incorrect password", async () => {
  await login(correctEmail, 'wrongpassword');
  await expect(loginFailureNotification).toContainText(
    'Įvedėte neteisingą el. paštą arba slaptažodį. Įsitikinkite, kad duomenys teisingi ir bandykite dar kartą.'
  );
});

// Unsuccessful login: incorrect email, correct password
test("Unsuccessful login, incorrect email, correct password", async () => {
  await login('gytistestavicius255@gmail.com', correctPassword);
  await expect(loginFailureNotification).toContainText(
    'Įvedėte neteisingą el. paštą arba slaptažodį. Įsitikinkite, kad duomenys teisingi ir bandykite dar kartą.'
  );
});

// Unsuccessful login: email and password fields are empty
test("Unsuccessful login, email and password fields are empty", async () => {
  await login('', '');
  await expect(emailLoginErrorMessage).toContainText('El. paštas laukas privalomas');
  await expect(passwordLoginErrorMessage).toContainText('Slaptažodis laukas privalomas');
});