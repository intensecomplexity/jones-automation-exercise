// Same flow as jones-automation.js, written as a Mocha test with assertions.
// Run with: npm test

const assert = require('node:assert/strict');
const { chromium } = require('playwright');

const SITE_URL = 'https://test.netlify.app/';

describe('Request a call back form', function () {
  this.timeout(60000);

  let browser;
  let page;

  before(async () => {
    browser = await chromium.launch(); // headless
  });

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto(SITE_URL);
  });

  afterEach(async () => {
    await page.close();
  });

  after(async () => {
    await browser.close();
  });

  it('Number of Employees defaults to 1-10', async () => {
    assert.equal(await page.getByLabel('Number of Employees').inputValue(), '1-10');
  });

  it('submits the filled form and lands on the thank-you page', async () => {
    await page.getByLabel('Name').fill('Nimrod Ryder');
    await page.getByLabel('Email').fill('nimrod@example.com');
    await page.getByLabel('Phone').fill('0501234567');
    await page.getByLabel('Company').fill('Jones Automation');
    await page.getByLabel('Website').fill('https://example.com');
    await page.getByLabel('Number of Employees').selectOption('51-500');

    await page.getByRole('button', { name: 'Request a call back' }).click();
    await page.waitForURL('**/thank-you.html**');

    assert.equal((await page.locator('h1').textContent()).trim(), 'Thank You!');
    const submitted = new URL(page.url()).searchParams;
    assert.equal(submitted.get('name'), 'Nimrod Ryder');
    assert.equal(submitted.get('number_of_employees'), '51-500');
  });

  it('does not submit when the required Name field is empty', async () => {
    await page.getByLabel('Email').fill('nimrod@example.com');
    await page.getByLabel('Phone').fill('0501234567');

    await page.getByRole('button', { name: 'Request a call back' }).click();

    assert.equal(new URL(page.url()).pathname, '/');
    assert.equal(await page.getByLabel('Name').evaluate((el) => el.validity.valueMissing), true);
  });

  it('does not submit when Website has no https:// scheme', async () => {
    await page.getByLabel('Name').fill('Nimrod Ryder');
    await page.getByLabel('Email').fill('nimrod@example.com');
    await page.getByLabel('Phone').fill('0501234567');
    await page.getByLabel('Website').fill('example.com');

    await page.getByRole('button', { name: 'Request a call back' }).click();

    assert.equal(new URL(page.url()).pathname, '/');
    assert.equal(await page.getByLabel('Website').evaluate((el) => el.validity.typeMismatch), true);
  });
});
