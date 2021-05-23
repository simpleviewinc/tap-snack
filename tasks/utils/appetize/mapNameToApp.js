const { get } = require('@keg-hub/jsutils')
const { Logger } = require('@keg-hub/cli-utils')

/**
 * Logs a warning when an Appetize app is missing a name
 * @param {Array} apps - All apps returned from the Appetize API 
 * @param {boolean} log - Logs output as the task runs
 *
 * @returns {Object} - Contains map of app names to appetize ids
 */
const logMissingName = (map, log, publicKey) => {
  log &&
    Logger.highlight(
      Logger.colors.yellow(`Appetize app with publicKey`),
      publicKey,
      Logger.colors.yellow(`is missing an app name, skipping!`)
    )

  return map
}

/**
 * Generates a map of appetize app public keys to tap names
 * @param {Array} apps - All apps returned from the Appetize API 
 * @param {boolean} warn - Logs warning when an app is missing a name
 *
 * @returns {Object} - Contains map of app names to appetize ids
 */
const mapNameToApp = (apps, warn) => {
  return apps.reduce((map, app) => {
    const name = get(app, 'name', get(app, 'meta.name'))

    if(!name) return logMissingName(map, warn, app.publicKey)

    map[name] = map[name] || {}
    map[name][app.publicKey] = app

    return map
  }, {})
}


module.exports = {
  mapNameToApp
}