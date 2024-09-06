// @flow
import BasePage from './BasePage'

const PRODUCTS_HEADER = '(//*[@data-test="title"][text()="Products"])'
const PRODUCT_NAME = "(//*[@data-test='inventory-item-name'])";
const PRODUCT_DESCRIPTION = "(//*[@data-test='inventory-item-desc'])";
const PRODUCT_PRICE = "(//*[@data-test='inventory-item-price'])";
const PRODUCT_IMAGE = "(//*[@class='inventory_item']//img)"
const ADD_TO_CART_BUTTON = "(//*[@class='pricebar']/button)";
const SHOPPING_CART_BUTTON = "//*[@data-test='shopping-cart-link']"
const SHOPPING_CART_ITEMS_NUMBER = "//*[@id='shopping_cart_container']//span"


export default class ProductsPage extends BasePage {
    async isProductsHeaderDisplayed() {
       return await this.waitForDisplayed(PRODUCTS_HEADER, 5)
    }

    async getProductsCount () {
        return await this.getCountOfArrayList(PRODUCT_NAME)
    }

    async getProductsNameTextByIndex(index : string){
        let xpath = `${PRODUCT_NAME}[${index}]`
        return await this.getText(xpath)
    }

    async getProductDescriptionTextByIndex(index : number ){
        let xpath = `${PRODUCT_DESCRIPTION}[${index}]`
        return await this.getText(xpath)
    }

    async getProductPriceTextByIndex(index: number){
        let xpath = `${PRODUCT_PRICE}[${index}]`
        return await this.getText(xpath)
    }

    async isAddToCartButtonDisplayed(index: number) {
        let xpath = `${ADD_TO_CART_BUTTON}[${index}]`
        return await this.waitForDisplayed(xpath)
    }

    async getImageSrcByIndex (index : number){
        let xpath = `${PRODUCT_IMAGE}[${index}]`
        return await this.getAttributeValue(xpath, 'src')
    }

    async clickAddToCartButtonByIndex(index: number) {
        let xpath = `${ADD_TO_CART_BUTTON}[${index}]`
        await this.click(xpath)
    }

    async clickOnShoppingCartButton(index: number) {
        await this.click(SHOPPING_CART_BUTTON)
    }

    async getItemsOnShoppingCartIcon(index: number) {
        return await this.getText(SHOPPING_CART_ITEMS_NUMBER)
    }
}