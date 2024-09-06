import { assert } from 'chai'
import CommonFlows from '../Commons/CommonFlows'
import ProductsPage from "../pageobjects/ProductsPage";
import LoginPage from "../pageobjects/LoginPage";
import * as path from "node:path";
import * as fs from "node:fs";
import CheckoutPage from "../pageobjects/CheckoutPage";

let loginPage
let productPage
let checkoutPage
loginPage = new LoginPage()
productPage= new ProductsPage()
checkoutPage = new CheckoutPage()


describe('Testing Login Form', function () {
    it('Login with Valid Credentials', async function () {
        await CommonFlows.loginToWebSite()
        let actual = await productPage.isProductsHeaderDisplayed()
        assert.isTrue(actual, 'Product header is not displayed')
    })

    it('Login with Invalid Credentials', async function () {
        await CommonFlows.loginToWebSiteWithInvalidCredentials()
        let actual = await loginPage.verifyCredentialsErrorMessage()
        let expected = 'Epic sadface: Username and password do not match any user in this service'
       assert.equal(actual,expected,'Error Message is not matching')
    })

    it('Verify all products are displayed correctly', async function () {
        await CommonFlows.loginToWebSite()
        await productPage.isProductsHeaderDisplayed()

        let totalProducts = await productPage.getProductsCount()

        let products = []
        for (let i = 0; i < totalProducts; i++) {
            let productName = await productPage.getProductsNameTextByIndex(i+1)
            let productDescription = await productPage.getProductDescriptionTextByIndex(i+1)
            let productPrice= await productPage.getProductPriceTextByIndex(i+1)
            let productImgSrc = await productPage.getImageSrcByIndex(i+1)

            // Verifying that the add to cart button is there for each product
            const isAddToCartButtonPresent = await productPage.isAddToCartButtonDisplayed(i + 1);
            assert.ok(isAddToCartButtonPresent, `Add to Cart button is missing for product ${productName}`);

            products.push({
                productName: productName,
                productDescription: productDescription,
                productPrice: productPrice,
                productImageSrc:productImgSrc
            })
        }

        const filePath = path.resolve(__dirname, '../test-data/products.json')
        const data = await fs.promises.readFile(filePath, 'utf-8')
        const expectedProducts = JSON.parse(data)


        products.forEach((actualProduct, index) => {
            const expectedProduct = expectedProducts[index];

            assert.strictEqual(actualProduct.productName, expectedProduct.productName, `Product name mismatch at index ${index + 1}`);
            assert.strictEqual(actualProduct.productDescription, expectedProduct.productDescription, `Product description mismatch at index ${index + 1}`);
            assert.strictEqual(actualProduct.productPrice, expectedProduct.productPrice, `Product price mismatch at index ${index + 1}`);
            assert.strictEqual(actualProduct.productImageSrc, expectedProduct.productImageSrc, `Product image src mismatch at index ${index + 1}`);
        })
    })

    it('Add Products to cart and checkout', async function () {
        await CommonFlows.loginToWebSite()
        await productPage.isProductsHeaderDisplayed()
         let addItems = 3
        for (let i = 0; i < addItems; i++) {
           await productPage.clickAddToCartButtonByIndex(i + 1)
        }

        // Verify number of added items
        let actual = await productPage.getItemsOnShoppingCartIcon()
        let expected = addItems.toString()
        assert.equal(actual, expected, 'Products on shopping cart are not matching')

        //Checkout
        await productPage.clickOnShoppingCartButton()
        await checkoutPage.clickOnCheckoutButton()

        await checkoutPage.fillCheckOutForm()
        await checkoutPage.clickOnFinishButton()

        // Verify notification is displayed
        let actualNotification = await checkoutPage.getCheckoutCompletedNotificationText()
        let expectedNotification = 'Thank you for your order!'
        assert.equal(actualNotification, expectedNotification, 'Checkout message is not correct')

    })


})
