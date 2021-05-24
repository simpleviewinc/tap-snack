const { sharedOptions, Logger } = require('@keg-hub/cli-utils')
const { callApi } = require('../../utils/appetize/callApi')

/**
 * Gets an app from the Appetize API based on name or public key
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Root task name
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {string} args.task - Task Definition of the task being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {string} args.params - Passed in options, converted into an object
 *
 * @returns {void}
 */
const getApp = async args => {
  const { params, globalConfig } = args
  const app = await callApi(
    { ...params, method: 'get' },
    globalConfig
  )

  params.log && Logger.log(app)

  return app
}

module.exports = {
  get: {
    name: 'get',
    example: 'appetize get <options>',
    description : 'Get an uploaded appetize app based on its public key',
    action: getApp,
    options: sharedOptions(
      'appetize get',
      {},
      [
        "key",
        'token',
        'log'
      ],
      'appetize'
    ),
  }
}