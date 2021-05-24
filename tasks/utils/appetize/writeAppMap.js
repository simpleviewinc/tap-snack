const path = require('path')
const { appMapPath } = require('../../paths')
const { fileSys } = require('@keg-hub/cli-utils')

/**
 * Writes the passed in app map object to the appMap config
 * @param {Object} appMap - Appetize Apps mapped by name and public id
 * 
 * @returns {Void}
 */
const writeAppMap = async appMap => {
  const [err, resp] = await fileSys.writeFile(appMapPath, JSON.stringify(appMap, null, 2))
  err && error.throwExitError(err)
}

module.exports = {
  writeAppMap
}