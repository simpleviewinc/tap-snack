const { deepMerge } = require('@keg-hub/jsutils')
const { sharedOptions, Logger } = require('@keg-hub/cli-utils')
const { writeAppMap } = require('../../utils/appetize/writeAppMap')
const { listAllApps } = require('../../utils/appetize/listAllApps')
const { mapNameToApp } = require('../../utils/appetize/mapNameToApp')

/**
 * Generates a map of appetize app public keys to tap names
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
const generateMap = async args => {
  const { params } = args
  const { log } = params

  const apps = await listAllApps(
    deepMerge(args, { params: { log: false }})
  )

  const mappedApps = mapNameToApp(apps, log)

  await writeAppMap(mappedApps)
  log && Logger.success(`\nAppetize nameMap written successfully!\n`)

  return mappedApps
}

module.exports = {
  generate: {
    name: 'generate',
    alias: ['gen', 'map'],
    example: 'appetize generate <options>',
    description : 'Generates a map of appetize app public keys to tap names',
    action: generateMap,
    options: sharedOptions(
      'appetize generate',
      {},
      [
        'token',
        'log',
      ],
      'appetize'
    ),
  }
}