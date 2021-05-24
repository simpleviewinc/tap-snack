const { get } = require('@keg-hub/jsutils')
const { getKegGlobalConfig, error } = require('@keg-hub/cli-utils')
const { APT_API_TOKEN } = process.env

/**
 * Finds the Appetize API token to use when calling the Appetize API
 * @param {string} token - Appetize api token
 * @param {Object} globalConfig - Global keg-config
 * 
 * @returns {string} - Resolved appetize api token
 */
const resolveToken = (token, globalConfig) => {
  const aptToken = token ||
    APT_API_TOKEN ||
    get(globalConfig || getKegGlobalConfig(), `cli.settings.appetize.token`)

  return aptToken || error.throwExitError(new Error([
    `Could not resolve Appetize API token!`,
    `\tThe Appetize token can be defined from:`,
    `\t  * A task option => "--token <appetize-token>"`,
    `\t  * Set as environment the variable => "APT_API_TOKEN=<appetize-token>"`,
    `\t  * Defined in the Keg Global Config => "cli.settings.appetize.token=<appetize-token>"\n`
  ].join('\n')))
}


module.exports = {
  resolveToken
}