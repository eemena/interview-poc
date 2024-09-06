// @flow

import EnvConfig from '../config/EnvConfig.js'

class DriverUtils {
    baseUrl () {
        return EnvConfig.BASE_URL()
    }

    browserName () {
        return EnvConfig.BROWSER()
    }

    async goToBaseUrl () {
        return browser.url(await this.baseUrl())
    }
}
export default new DriverUtils()
