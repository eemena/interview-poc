// @flow

// Local server for local testing

const localServer = 'localhost'

export default class DriverBuilder {
    static getSeleniumServer () {
        const server = process.env.SELENIUM_SERVER
        switch (server) {
            case 'LOCAL':
            case 'HEADLESS':
                return {
                    server: localServer,
                    port: 4444,
                    path: '/'
                }
        }
    }

    static getCapabilities () {
        const server = process.env.SELENIUM_SERVER
        const testBrowser = process.env.TEST_BROWSER_NAME

        const localCapabilities = {
            browserName: testBrowser,
            acceptInsecureCerts: true,
            strictSSL: false,
            'goog:chromeOptions': {
                args: ['--ignore-certificate-errors', '--window-size=1920,1080', '--disable-browser-side-navigation'],
            }
        }

        const localHeadlessCapabilities = {
            browserName: testBrowser,
            acceptInsecureCerts: true,
            strictSSL: false,
            'goog:chromeOptions': {
                args: ['--ignore-certificate-errors', '--window-size=1920,1080', '--disable-browser-side-navigation', '--headless'],

            }

        }

        return server === 'LOCAL' ? localCapabilities : localHeadlessCapabilities
    }
}
