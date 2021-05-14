const path = require('path')
const { apiPost } = require('./api')
const { throwError } = require('./throwError')
const { noOpObj } = require('@keg-hub/jsutils')
const { Logger } = require('@keg-hub/cli-utils')

const rootLoc = path.join(__dirname, '../../')
const ipaPath = path.join(rootLoc, './build/tap-vaa-develop.ipa')

/**
 * Upload an app build to the browserstack API
 * @private
 * @type {function}
 * @param {string} file - Path to the file on the host machine
 * @returns  {Promise<Object>} - Gets the full path to the app file
 */
const getUploadFile = file => {
  // !file && throwError(`Upload method requires a file property in the arguments object!`)

  return ipaPath
}

/**
 * Upload an app build to the browserstack API
 * @external
 * @type {function}
 * @param {Object} args - Defines options for the post request
 * @param {Object} args.file - Path to the file on the host machine
 * @param {Object} id - Test ID that should be used as the custom id in browserstack
 * 
 * @returns  {Promise<Object>} - Resolves to the request response
 */
const upload = async (args=noOpObj) => {
  const { file, id, log } = args
  const toUpload = getUploadFile(file)

  log && Logger.pair(`Uploading app => `, toUpload)

  const resp = await apiPost({
    url: 'app-live/upload',
    files: { file: toUpload },
    ...(id && { data: { data: { custom_id: id }}}),
  })

  log && Logger.success(`Finished uploading app to BrowserStack!\n`)

  return resp
}

module.exports = {
  upload
}