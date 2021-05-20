const { yarn, Logger } = require('@keg-hub/cli-utils')

/**
 * Uses the eas cli to build an app in the expo cloud servers
 * Creates a link like https://expo.io/accounts/simpleview/builds/86435b64-5d67-4dc1-a833-dd928ce69314
 * @param {*} args.params - Options object passed to the task
 * 
 * @returns {string} - Built url for the android apk
 */
const buildAnd = async ({ params }) => {
  const { profile } = params

  const buildArgs = [
    `-p android`,
    `--profile ${profile}`
  ]

  // TODO: Update to pull the url from the cmd output
  Logger.info(`Build Android app...`)
  return await yarn(`build:eas ${buildArgs.join(' ').trim()}`)
}

module.exports = {
  buildAnd
}