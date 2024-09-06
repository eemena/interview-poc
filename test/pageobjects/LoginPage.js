// @flow
import BasePage from './BasePage'

const USERNAME_TEXT_BOX = '#user-name'
const PASSWORD_TEXTBOX = '#password'
const SIGN_IN_BUTTON = '#login-button'
const ERROR_MESSAGE_INVALID_CREDENTIALS = '//*[@class="error-message-container error"]/h3'

export default class LoginPage extends BasePage {
    async verifyPageIsLoaded ()
    {
        await this.waitForDisplayed(USERNAME_TEXT_BOX)
    }

    async login (username: string, password: string) {
        await this.sendKeys(USERNAME_TEXT_BOX, username, true)
        await this.sendKeys(PASSWORD_TEXTBOX, password, true)
        await this.click(SIGN_IN_BUTTON)
    }

    async verifyCredentialsErrorMessage(){
        await this.waitForDisplayed(ERROR_MESSAGE_INVALID_CREDENTIALS)
        return await this.getText(ERROR_MESSAGE_INVALID_CREDENTIALS)
    }
}