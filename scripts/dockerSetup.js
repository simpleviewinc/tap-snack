require('dotenv').config()
const path = require('path')
const appRoot = path.join(__dirname, '../')
const { setAppRoot, yarn, error } = require('@keg-hub/cli-utils')

setAppRoot(appRoot)

const { DOC_APP_PATH } = process.env

;(async () => {
  DOC_APP_PATH &&
    error.throwExitError({ stack: 'This script must be run inside a docker container' })

  // Build the snack app
  await yarn(`build`)

  // Copy the build to the correct build path
  await yarn(`copy:build`)

})()