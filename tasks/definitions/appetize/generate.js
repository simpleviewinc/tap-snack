
const { deepMerge, get } = require('@keg-hub/jsutils')
const { sharedOptions, Logger } = require('@keg-hub/cli-utils')
const { writeAppMap } = require('../../utils/appetize/writeAppMap')
const { listAllApps } = require('../../utils/appetize/listAllApps')

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
 * @param {boolean} log - Logs output as the task runs
 *
 * @returns {Object} - Contains map of app names to appetize ids
 */
const mapNameToApp = (apps, log) => {
  return apps.reduce((map, app) => {
    const name = get(app, 'name', get(app, 'meta.name'))

    if(!name) return logMissingName(map, log, app.publicKey)

    map[name] = map[name] || {}
    map[name][app.publicKey] = app

    return map
  }, {})
}

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

  const apps = await listAllApps(deepMerge(args, {
    params: { log: false }
  }))

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