# Configuration

npm needs to be installed 

## IDEs
I used webstorm but the project should work on VS code also

## Commands
after clonnig and installing npm run the following commands:
`npm install`

Wait for the installation to complete then
`npm run install`

After that selenium and all the dependencies from package.json should be installed
now  to run the test just type:
`npm run debug`
This will start the test in chrome browser

## .env File
On the .env file you can choose to run the test on LOCAL or HEADLESS

## Test Created
*Testing Login Form*
Will login with correct credentials into the webpage 

*Login with Invalid Credentials*
Will log with invalid credentials and will check for an error message

*Verify all products are displayed correctly*
Will get all the info from the products then it will save it in an object that will be use to be compared against a json file that contains the expected data

*Add Products to cart and checkout*
Will add products to the cart then it will verify that the number of items displayed in the cart icon ar correct. Then it will complete the purchase process looking for a confirmation message.


