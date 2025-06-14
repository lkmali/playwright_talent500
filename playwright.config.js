// @ts-check
const { defineConfig, devices } = require('@playwright/test');
/**
 * @see https://playwright.dev/docs/test-configuration
 */
module.exports = defineConfig({
    globalTimeout: 120000,
    expect: {
        timeout: 40 * 1000,
    },
    testDir: './tests',
    /* Run tests in files in parallel */
    fullyParallel: true,



    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,

    /* Retry on CI only */
    // retries: process.env.CI ? 2 : 0,
    retries: 1,

    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: [['html'],
    ['list'],
    ['allure-playwright', { outputFolder: 'allure-results' }]
    ],
    use: {
        trace: 'on-first-retry',
    },

    /* Configure projects for major browsers */
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
            timeout: 90000
        },

        {
            name: 'firefox',
            use: { ...devices['Desktop Firefox'] },
        },

        {
            name: 'webkit',
            use: { ...devices['Desktop Safari'] },
        },

    ],
});