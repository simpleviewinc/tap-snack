const { runCmd, Logger, error } = require('@keg-hub/cli-utils')
const { noOpObj } = require('@keg-hub/jsutils')

/**
 * Uses the eas cli to build an app in the expo cloud servers
 * Creates a link like 
 * @param {*} args.params - Options object passed to the task
 * 
 * @returns {string} - Built url for the android apk
 */
const eas = async ({ profile, platform, location=process.cwd(), events=noOpObj }) => {
  (!platform || !profile) &&
    error.throwError(`Eas CLI requires a platform (IOS | Android ) and profile!`)

  Logger.info(`Build ${platform} with profile ${profile}...`)

  return await runCmd(`eas`, [`-p ${platform}`, `--profile ${profile}`], {
    ...events,
  }, location)

}

module.exports = {
  eas
}
