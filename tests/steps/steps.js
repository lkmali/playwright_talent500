const { Given, When, Then } = require('@cucumber/cucumber');
const { chromium } = require('playwright');
const { takeScreenshot } = require('../../utils/screenshotUtil');

let browser, page;

Given('I open the contact page {string}', { timeout: 20000 }, async function (url) {
    browser = await chromium.launch({ headless: false, slowMo: 100 }); // use headless: false to debug
    const context = await browser.newContext();
    page = await context.newPage();

    // Use waitUntil option
    await page.goto(url, { waitUntil: 'domcontentloaded' });
    console.log('✅ Page opened:', url);
});

When('I fill the form with the following details:', async function (dataTable) {
    console.log('Filling form with data:', dataTable);
    const data = dataTable.rawTable[1];
    await page.fill('input[name="name"]', data[0]);
    await page.fill('input[name="email"]', data[1]);
    await page.fill('textarea[name="message"]', data[2]);
});

When('I submit the form', async function () {
    await page.click('button[type="submit"]');
});

Then('I should see the confirmation message {string}', async function (expectedMessage) {
    await page.waitForSelector('#confirmation');
    const actualMessage = await page.textContent('#confirmation');

    // 📸 Take screenshot using utility
    await takeScreenshot(page, 'form_submission');

    if (!actualMessage.includes(expectedMessage)) {
        throw new Error(`Expected message "${expectedMessage}", but got "${actualMessage}"`);
    }

    await browser.close();
});
