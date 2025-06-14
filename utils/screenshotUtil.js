const fs = require('fs');
const path = require('path');

/**
 * Captures a screenshot from the given Playwright `page` instance.
 * @param {object} page - Playwright page object.
 * @param {string} filenamePrefix - Optional prefix for the screenshot file.
 * @returns {Promise<string>} - Returns the screenshot file path.
 */
async function takeScreenshot(page, filenamePrefix = 'screenshot') {
    const dirPath = path.join(__dirname, '..', 'screenshots');
    fs.mkdirSync(dirPath, { recursive: true });

    const fileName = `${filenamePrefix}_${Date.now()}.png`;
    const screenshotPath = path.join(dirPath, fileName);

    await page.screenshot({ path: screenshotPath });
    console.log(`✅ Screenshot saved to ${screenshotPath}`);

    return screenshotPath;
}

module.exports = { takeScreenshot };
