# Jones Automation exercise, part a

Playwright script that fills the form on https://test.netlify.app/, sets Number of Employees to 51-500, takes a screenshot before submitting, and logs when the thank-you page is reached. The script checks its own result: it exits with an error if the selection didn't change, the heading isn't "Thank You!", or the submitted employees value is wrong.

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

## Tests (Mocha)

```
npm test
```

`test/form.spec.js` runs the same flow headless as a Mocha suite, plus two negative cases: the form must not submit with an empty required Name, or with a Website value missing `https://`.
