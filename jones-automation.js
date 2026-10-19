// Jones Automation exercise, part a
// Fills the form on https://test.netlify.app/, takes a screenshot, submits,
// and logs a line when the thank-you page is reached.
// Run with: node jones-automation.js

const { chromium } = require('playwright');

const URL = 'https://test.netlify.app/';

const formData = {
  name: 'Nimrod Ryder',
  email: 'nimrod@example.com',
  phone: '0501234567',
  company: 'Jones Automation',
  website: 'https://example.com', // type="url" field: must include the scheme
};

(async () => {
  const browser = await chromium.launch({ headless: false });
  const page = await browser.newPage();

  try {
    await page.goto(URL);

    // 1. Type values into the form fields
    await page.getByLabel('Name').fill(formData.name);
    await page.getByLabel('Email').fill(formData.email);
    await page.getByLabel('Phone').fill(formData.phone);
    await page.getByLabel('Company').fill(formData.company);
    await page.getByLabel('Website').fill(formData.website);

    // 2. Bonus: change Number of Employees from 1-10 to 51-500
    const employees = page.getByLabel('Number of Employees');
    console.log('Number of Employees before:', await employees.inputValue());
    await employees.selectOption('51-500');
    console.log('Number of Employees after:', await employees.inputValue());

    // 3. Screenshot of the filled form, before clicking the button
    await page.screenshot({ path: 'before-click.png', fullPage: true });
    console.log('Screenshot saved: before-click.png');

    // 4. Click "Request a call back"
    await page.getByRole('button', { name: 'Request a call back' }).click();

    // 5. Wait for the thank-you page and log it
    await page.waitForURL('**/thank-you.html**');
    const heading = (await page.locator('h1').textContent()).trim();
    console.log('Reached the thank you page:', page.url());
    console.log('Page heading:', heading);
  } catch (error) {
    console.error('Automation failed:', error.message);
    process.exitCode = 1;
  } finally {
    await browser.close();
  }
})();
