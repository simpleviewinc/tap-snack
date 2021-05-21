const { easCli } = require('./commands')
const { noOpObj } = require('@keg-hub/jsutils')
const { Logger, addParam } = require('@keg-hub/cli-utils')

/**
 * Builds the params to pass on to the eas build command
 * Taken from https://github.com/expo/eas-cli#eas-build
 * @param {Object} params - Options object passed to the task
 * 
 * @returns {Array} - Extra params formatted to match the eas build command arguments
 */
const getListArgs = ({ limit, status }) => {
  return ([
    addParam('limit', limit),
    addParam('status', status)
  ]).filter(val => val)
}

/**
 * Uses the eas cli to build an app in the expo cloud servers
 * Creates a link like 
 * @param {Object} args.params - Options object passed to the task
 * 
 * @returns {string} - Built url for the android apk
 */
const list = async (args) => {
  const {
    platform='all',
    params=noOpObj,
    options=noOpObj,
    location=process.cwd(),
  } = args

  Logger.info(`Getting builds for platform ${platform}...`)

  return await easCli(
    [ 'build:list', `--platform`, platform, ...getListArgs(params) ],
    options,
    location
  )

}

module.exports = {
  list
}
