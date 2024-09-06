// @flow

export default class BasePage {
    /**
     * Waits for locator to be found and web element is visible
     * @param locator
     * @param retries
     * @returns {Promise<*|boolean>}
     */
    async waitForDisplayed (locator: string, retries: number = 2) {
        try {
            const element = $(locator)
            await element.waitForDisplayed()
            return element.isDisplayed()
        } catch (err) {
            if (retries === 0) {
                throw new Error(`Element ${locator} was not displayed after maximun retries, ERROR message: ${err.message.toString()}`)
            }
        }
        return this.waitForDisplayed(locator, retries - 1)
    }

    /**
     * Send values to text box using defined locator
     * @param locator
     * @param keys
     * @param retries
     * @returns {Promise<*|undefined>}
     */
    async sendKeys (locator: string, keys: string, retries: number = 2) {
        try {
            const element = await $(locator)
            await element.click()
            await element.clearValue()
            await element.setValue(keys)
        } catch (err) {
            if (retries === 0) {
                throw new Error(`Unable to send keys to ${locator} after maximum retries, ERROR message: ${err.message}`)
            }
            await this.sleep(1000)
            return this.sendKeys(locator, keys, retries - 1)
        }
    }

    /**
     * Just to wait
     * @param timeout
     * @returns {Promise<void>}
     */
    async sleep (timeout: number) {
        await browser.pause(timeout)
    }

    async browserRefresh () {
        await browser.refresh()
    }

    /**
     * Click on element
     * @param locator
     * @param retries
     * @returns {Promise<*|undefined>}
     */
    async click (locator: string, retries: number = 3) {
        try {
            const element = await $(locator)
            await element.click()
        } catch (err) {
            if (retries === 0) {
                throw new Error(`Still not able to click ${locator} after maximum retries, ERROR message: ${err.message.toString()}`)
            }
            await this.sleep(250)
            return this.click(locator, retries - 1)
        }
    }

    /**
     * Wait for an element to exist
     * @param locator
     * @param retries
     * @returns {Promise<WebdriverIO.Element|*|undefined>}
     */
    async waitForExist (locator: string, retries: number = 1) {
        try {
            const element = await $(locator)
            await element.waitForExist()
            return element
        } catch (err) {
            if (retries === 0) {
                throw new Error(`Element ${locator} does not exist after maximum retries, Error Message: ${err.message.toString()}`)
            }
            return this.waitForExist(locator, retries - 1)
        }
    }

    /**
     * Get text from element
     * @param locator
     * @param retries
     * @returns {Promise<string|*|undefined>}
     */
    async getText (locator: string, retries: number = 1) {
        const stepName = `Get text from element: \n "${locator}"`
        try {
            const element = await this.waitForExist(locator)
            return await element.getText()
        } catch (err) {
            if (retries === 0) {
                throw new Error(`Unable to get ${locator} text after maximum retries, Error message: ${err.message}`)
            }
            await this.sleep(250)
            return this.getText(locator, retries - 1)
        }
    }

    /**
     * Function will get the length of the elements array
     * @param locator
     * @param retries
     * @returns {Promise<number|*|undefined>}
     */
    async getCountOfArrayList (locator: string, retries: number = 1) {
        try {
            const numberOfElements = await $$(locator).length
            return numberOfElements
        } catch (err) {
            if (retries === 0) {
                throw new Error(`Unable to get ${locator} count after max retries, ERROR Message: ${err.message}`)
            }
            await this.sleep(250)
            return this.getCountOfArrayList(locator, retries - 1)
        }
    }

    /**
     * Get the attribute from an element
     * @param locator
     * @param attribute
     * @param retries
     * @returns {Promise<string|*|undefined>}
     */
    async getAttributeValue (locator: string, attribute: string, retries: number = 1) {
        const stepName = `Get "${attribute}" attribute from element: \n "${locator}"`
        try {
            const element = await this.waitForExist(locator)
            const attributeValue = await element.getAttribute(attribute)
            return attributeValue
        } catch (err) {
            if (retries === 0) {
                throw new Error(`Unable to get ${locator} attributes value after maximum retries, ERROR Message: ${err.message}`)
            }
            await this.sleep(250)
            return this.getAttributeValue(locator, attribute, retries - 1)
        }
    }
}
