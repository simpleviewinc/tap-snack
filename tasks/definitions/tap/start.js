const { sharedOptions } = require('@keg-hub/cli-utils')
const { resolveToken } = require('../../utils/appetize/resolveToken')

/**
 * Starts the snack tap with docker-compose calling the keg-cli tap start task
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
const startTap = async (args) => {
  const { params, globalConfig } = args
  const token = resolveToken(params.token, globalConfig)
  token && (process.env['APT_API_TOKEN'] = token)

  await args.task.cliTask(args)
}

module.exports = {
  start: {
    name: 'start',
    alias: ['st'],
    action: startTap,
    example: 'snack start',
    // Merge the default task options with these custom task options
    mergeOptions: true,
    description : 'Starts tap snack docker-compose service',
    options: sharedOptions('snack start', {}, ['token'], 'appetize')
  }
}
