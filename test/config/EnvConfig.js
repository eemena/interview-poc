// @flow
import { config as dotenvConfig } from 'dotenv'
dotenvConfig()

export default {
    BROWSER () {
        return process.env.TEST_BROWSER_NAME
    },

    async BASE_URL () {
        return process.env.BASE_URL
    },

    async getEnvRow () {
        return  process.env.TEST_ENVIRONMENT
    }
}
