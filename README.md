# Jones Automation exercise, part a

Playwright script that fills the form on https://test.netlify.app/, sets Number of Employees to 51-500, takes a screenshot before submitting, and logs when the thank-you page is reached.

## Setup

```
npm install
npx playwright install chromium
```

## Run

```
node jones-automation.js
```

(or `npm start`)

Output: `before-click.png` in the project folder, and the thank-you page URL and heading printed to the console.
