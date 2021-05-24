
const { callApi } = require('./callApi')
const { formatApp } = require('./formatApp')
const { capitalize } = require('@keg-hub/jsutils')
const { getPlatforms } = require('../getPlatforms')
const { sharedOptions, Logger } = require('@keg-hub/cli-utils')

/**
 * NoOp object matching the Appetize API get response
 * @type {Object}
 * @private
 */
const dataNoOp = { data: [] }

/**
 * Logs the apps returned from the Appetize API
 * @type {function}
 * @private
 * @param {boolean} log - Defines how to call the Appetize API
 * @param {Array} apps - Apps returned from the Appetize API
 *
 * @returns {Void}
 */
const logApps = (log, apps) => {
  if(!log) return

  Logger.subHeader(`Appetize Apps`)
  apps.length ? Logger.log(apps) : Logger.warn(`No apps found!`)

  Logger.empty()
}


/**
 * Lists all apps returned from the Appetize API
 * Can be called directly from a task definition
 * @type {function}
 * @exports
 * @param {Object} args - arguments passed from the runTask method
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {string} args.params - Passed in options, converted into an object
 *
 * @returns {Array} - List of all apps returned from the Appetize API
 */
const listAllApps = async args => {
  const { params, globalConfig } = args
  const { token, log } = params

  const { data:apps } = await callApi({
    token,
    method: 'getAll',
  }, globalConfig) || dataNoOp

  logApps(log, apps)

  return apps.map(formatApp)
}

module.exports = {
  listAllApps
}