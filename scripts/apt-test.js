require('dotenv').config()

const { upload } = require('../libs/appetize')

/**
 * Steps to be automated
 * IOS
 *   1. Build simulator bundle
 *     * See Appetize docs => https://docs.appetize.io/core-features/uploading-apps
 *   2. Tar the bundle output
 *     * Use the functions in the libs/tar folder if needed
 *   3. Upload to appetize
 *   4. Generate Url
 *     * Figure out how to do this
 *   5. Render url in an Appetize component
 *     * For now an just be a simple example
 * ANDROID
 *   Should be mostly the same as IOS, but need to be investigated
 *   It also looks like appetize accepts an APK
 *   So it's possible just a normal Android build would work 
 * 
 * GoDaddy packages that may be helpful
 * Github - https://github.com/godaddy/appetizer
 * NPM - https://www.npmjs.com/package/appetizer
 * 
 */

const {
  BUILD_PATH,
  PLATFORM='ios',
  TOKEN,
  URL,
} = process.env

;(async () => {
  const response = await upload({
    url: URL,
    filePath: BUILD_PATH,
    platform: PLATFORM,
    token: TOKEN
  })

  console.log('RESPONSE: \n', JSON.stringify(response.data, null, 2))
})()