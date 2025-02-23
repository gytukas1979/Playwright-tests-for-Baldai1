#**Playwright tests

This project contains some basic login, sorting, and cart tests using Playwright (Vanilla Javascript) on the https://baldai1.lt page.
Before running the tests, ensure that you have the following installed:

Node.js (version 14 or higher)
npm (Node Package Manager)
Playwright library

##Tests included (last updated on the 2025-02-23)
- **Login Tests:**
  - Successful login with correct email and password.
  - Successful login/logout test.
  - Unsuccessful login with incorrect email or password.
  - Validation for empty email and password fields.

- **Sorting Tests:**
  - Test that prices are sorted correctly from lowest to highest.
  - Test that prices are sorted correctly from highest to lowest.
  - Check if the sorting dropdown defaults to 'Recommended'.
  - Test if Default view shows 48 products and correct selection.
  - Test if selecting 24 products shows 24 products.
  - Test if selecting 96 products shows 96 products.

- **Cart Tests:**
  - Test the state of an empty cart.