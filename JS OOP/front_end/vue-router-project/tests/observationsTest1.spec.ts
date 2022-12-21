import { test, expect } from '@playwright/test';

test('Inputting observation', async ({ page }) => {

  await page.goto('http://localhost:8080/createobservation');
  await page.getByLabel('Date').click();
  await page.getByLabel('Date').press('Tab');
  await page.getByLabel('Date').press('Tab');
  await page.locator('div:nth-child(2) > .col-9 > .form-control').fill('50.2');
  await page.locator('div:nth-child(2) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(3) > .col-9 > .form-control').fill('1');
  await page.locator('div:nth-child(3) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(4) > .col-9 > .form-control').fill('4.5');
  await page.locator('div:nth-child(4) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(5) > .col-9 > .form-control').fill('110');
  await page.locator('div:nth-child(5) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(6) > .col-9 > .form-control').fill('15');
  await page.locator('div:nth-child(6) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(7) > .col-9 > .form-control').fill('1');
  await page.locator('div:nth-child(7) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(8) > .col-9 > .form-control').fill('2');
  await page.locator('div:nth-child(8) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(9) > .col-9 > .form-control').fill('15');
  await page.locator('div:nth-child(9) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(10) > .col-9 > .form-control').fill('12');
  await page.locator('div:nth-child(10) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(11) > .col-9 > .form-control').fill('1014');
  await page.locator('div:nth-child(11) > .col-9 > .form-control').press('Tab');
  await page.getByRole('combobox').first().selectOption('2');
  await page.getByRole('combobox').first().press('Tab');
  await page.locator('div:nth-child(13) > .col-9 > .form-control').fill('1.2');
  await page.locator('div:nth-child(13) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(14) > .col-9 > .form-control').fill('25');
  await page.locator('div:nth-child(14) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(15) > .col-9 > .form-control').fill('82');
  await page.locator('div:nth-child(15) > .col-9 > .form-control').press('Tab');
  await page.locator('.col-7 > .form-control').first().fill('15');
  await page.locator('.col-7 > .form-control').first().press('Tab');
  await page.getByRole('combobox').nth(1).selectOption('km');
  await page.getByRole('combobox').nth(1).press('Tab');
  await page.locator('div:nth-child(17) > .col-7 > .form-control').fill('10');
  await page.locator('div:nth-child(17) > .col-7 > .form-control').press('Tab');

  await page.getByText('BBXX SHIP 99502 10045 97 1115 10150 20120 40140 52012 72582 22212 0100 2').click();








  // await page.goto('https://playwright.dev/');

  // // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);

  // // create a locator
  // const getStarted = page.getByRole('link', { name: 'Get started' });

  // // Expect an attribute "to be strictly equal" to the value.
  // await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // // Click the get started link.
  // await getStarted.click();

  // // Expects the URL to contain intro.
  // await expect(page).toHaveURL(/.*intro/);
});
test('Inputting again', async ({ page }) => {

  await page.goto('http://localhost:8080/createobservation');
  await page.getByLabel('Date').click();
  await page.getByLabel('Date').press('Tab');
  await page.getByLabel('Date').press('Tab');
  await page.locator('div:nth-child(2) > .col-9 > .form-control').fill('50.2');
  await page.locator('div:nth-child(2) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(3) > .col-9 > .form-control').fill('1');
  await page.locator('div:nth-child(3) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(4) > .col-9 > .form-control').fill('4.5');
  await page.locator('div:nth-child(4) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(5) > .col-9 > .form-control').fill('110');
  await page.locator('div:nth-child(5) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(6) > .col-9 > .form-control').fill('15');
  await page.locator('div:nth-child(6) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(7) > .col-9 > .form-control').fill('1');
  await page.locator('div:nth-child(7) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(8) > .col-9 > .form-control').fill('2');
  await page.locator('div:nth-child(8) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(9) > .col-9 > .form-control').fill('15');
  await page.locator('div:nth-child(9) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(10) > .col-9 > .form-control').fill('12');
  await page.locator('div:nth-child(10) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(11) > .col-9 > .form-control').fill('1014');
  await page.locator('div:nth-child(11) > .col-9 > .form-control').press('Tab');
  await page.getByRole('combobox').first().selectOption('2');
  await page.getByRole('combobox').first().press('Tab');
  await page.locator('div:nth-child(13) > .col-9 > .form-control').fill('1.2');
  await page.locator('div:nth-child(13) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(14) > .col-9 > .form-control').fill('25');
  await page.locator('div:nth-child(14) > .col-9 > .form-control').press('Tab');
  await page.locator('div:nth-child(15) > .col-9 > .form-control').fill('82');
  await page.locator('div:nth-child(15) > .col-9 > .form-control').press('Tab');
  await page.locator('.col-7 > .form-control').first().fill('15');
  await page.locator('.col-7 > .form-control').first().press('Tab');
  await page.getByRole('combobox').nth(1).selectOption('km');
  await page.getByRole('combobox').nth(1).press('Tab');
  await page.locator('div:nth-child(17) > .col-7 > .form-control').fill('10');
  await page.locator('div:nth-child(17) > .col-7 > .form-control').press('Tab');

  await page.getByText('BBXX SHIP 99502 10045 97 1115 10150 20120 40140 52012 72582 22212 0100 2').click();








  // await page.goto('https://playwright.dev/');

  // // Expect a title "to contain" a substring.
  // await expect(page).toHaveTitle(/Playwright/);

  // // create a locator
  // const getStarted = page.getByRole('link', { name: 'Get started' });

  // // Expect an attribute "to be strictly equal" to the value.
  // await expect(getStarted).toHaveAttribute('href', '/docs/intro');

  // // Click the get started link.
  // await getStarted.click();

  // // Expects the URL to contain intro.
  // await expect(page).toHaveURL(/.*intro/);
});
