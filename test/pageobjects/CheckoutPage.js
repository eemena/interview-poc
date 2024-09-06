import BasePage from "./BasePage";
import {CLIENT_FIRST_NAME, CLIENT_LAST_NAME, CLIENT_ZIP} from "../lib/ConstantUtil";

const CHECK_OUT_BUTTON = "#checkout"
const CHECK_OUT_HEADER = "(//*[@data-test='title'][text()='Your Cart'])"
const CHECKOUT_CLIENT_FIRST_NAME = "#first-name"
const CHECKOUT_CLIENT_LAST_NAME = "#last-name"
const CHECKOUT_CLIENT_POSTAL_CODE = "#postal-code"
const CHECKOUT_CLIENT_CONTINUE_BUTTON = "#continue"
const CHECKOUT_FINISH_BUTTON = "#finish"
const CHECKOUT_ORDER_COMPLETED_NOTIFICATION = "//*[@data-test='complete-header']"

export default class CheckoutPage extends BasePage {
    async isProductsHeaderDisplayed() {
        return await this.waitForDisplayed(CHECK_OUT_HEADER, 5)
    }

    async clickOnCheckoutButton () {
        await this.click(CHECK_OUT_BUTTON)
    }

    async clickOnContinueButton () {
        await this.click(CHECKOUT_CLIENT_CONTINUE_BUTTON)
    }

    async fillCheckOutForm(){
        await this.sendKeys(CHECKOUT_CLIENT_FIRST_NAME, CLIENT_FIRST_NAME)
        await this.sendKeys(CHECKOUT_CLIENT_LAST_NAME, CLIENT_LAST_NAME)
        await this.sendKeys(CHECKOUT_CLIENT_POSTAL_CODE, CLIENT_ZIP)
        await this.clickOnContinueButton()
    }

    async clickOnFinishButton () {
        await this.click(CHECKOUT_FINISH_BUTTON)
    }

    async getCheckoutCompletedNotificationText () {
        return await this.getText(CHECKOUT_ORDER_COMPLETED_NOTIFICATION)
    }

}