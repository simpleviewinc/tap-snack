const { easCli } = require('./commands')
const { noOpObj, noOpArr } = require('@keg-hub/jsutils')
const { Logger, error, addFlag } = require('@keg-hub/cli-utils')

/**
 * Builds the params to pass on to the eas build command
 * Taken from https://github.com/expo/eas-cli#eas-build
 * @param {Object} params - Options object passed to the task
 * 
 * @returns {Array} - Extra params formatted to match the eas build command arguments
 */
const getBuildArgs = ({ configuration, credentials, interactive, local, cache }) => {
  return ([
    addFlag('local', local),
    addFlag('clear-cache', !cache),
    addFlag('non-interactive', !interactive),
    addFlag('skip-credentials-check', !credentials),
    addFlag('skip-project-configuration', !configuration),
  ]).filter(val => val)
}

/**
 * Uses the eas cli to build an app in the expo cloud servers
 * Creates a link like 
 * @param {Object} args.params - Options object passed to the task
 * 
 * @returns {string} - Built url for the android apk
 */
const build = async (args) => {
  const {
    profile,
    platform,
    params=noOpObj,
    options=noOpObj,
    location=process.cwd(),
  } = args

  ;(!platform || !profile) &&
    error.throwError(`Eas CLI requires a platform (IOS | Android ) and profile!`)

  Logger.pair(`Build ${platform} with profile =>`, profile)

  return await easCli(
    [ 'build', `-p`, platform, `--profile`, profile, ...getBuildArgs(params) ],
    options,
    location
  )

}

module.exports = {
  build
}
