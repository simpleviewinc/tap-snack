const { getParams } = require('./getParams')
const appetize = require('@keg-hub/appetite')
const { error } = require('@keg-hub/cli-utils')
const { resolveToken } = require('./resolveToken')
const { isFunc, limbo } = require('@keg-hub/jsutils')

const throwExitError = err => { throw new Error(err) }

/**
 * Calls an Appetize API method based on passed in arguments
 * @type {function}
 * @exports
 * @throws
 * @param {Object} args - Defines how to call the Appetize API
 * @param {Array} args.method - Method of the Appetize API to be called
 * @param {Object} globalConfig - Keg-Cli global config object
 *
 * @returns {Object} - Response from the Appetize API
 */
const callApi = async ({ method, ...args }, globalConfig) => {

  !isFunc(appetize[method]) &&
    error.throwExitError(new Error([
      `Appetize method ${method} does not exist.`,
      `Allowed methods are ${Object.keys(appetize)}`
    ].join('\n')))

  const token = resolveToken(args.token, globalConfig)
  const params = getParams({ ...args, method, token })

  const [err, response] = await limbo(appetize[method](params))

  return err
    ? throwExitError(err)
    : response.data
}

module.exports = {
  callApi
}