// @flow
import LoginPage from "../pageobjects/LoginPage.js";
import {PASSWORD, USERNAME} from "../lib/ConstantUtil.js";

// Pages
let loginPage
export default {
    async loginToWebSite () {
        loginPage = new LoginPage()
        await loginPage.verifyPageIsLoaded()
        await loginPage.login(USERNAME, PASSWORD)
    },

    async loginToWebSiteWithInvalidCredentials () {
        loginPage = new LoginPage()
        await loginPage.verifyPageIsLoaded()
        await loginPage.login(USERNAME, 'Invalid Credentials')
    }
}
