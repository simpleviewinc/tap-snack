
const { sharedOptions } = require('@keg-hub/cli-utils')
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
const upsertApp = async args => {
  const { params, globalConfig } = args

  if (!params.filter)
    throw new Error('You must specify a filter with upsert.')

  const app = await callApi(
    { ...params, method: 'upsert' },
    globalConfig
  )
  console.log('Success!\n', app)
}

module.exports = {
  upsert: {
    name: 'upsert',
    example: 'appetize upsert <options>',
    description : 'Uploads an app to Appetize using the Appetize API',
    action: upsertApp,
    options: sharedOptions(
      'appetize upsert',
      {},
      [
        'file',
        'url',
        'platform',
        'ios',
        'android',
        'meta',
        'note',
        'log',
        'token',
        'filter'
      ],
      'appetize'
    ),
  }
}