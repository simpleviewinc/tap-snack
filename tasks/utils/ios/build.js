const { yarn, Logger } = require('@keg-hub/cli-utils')

/**
 * Uses the eas cli to build an app in the expo cloud servers
 * Creates a link like 
 * @param {*} args.params - Options object passed to the task
 * 
 * @returns {string} - Built url for the android apk
 */
const buildIOS = async ({ params }) => {
  const { profile } = params

  const buildArgs = [
    '-p ios',
    `--profile ${profile}`
  ]

  // TODO: Update to pull the url from the cmd output
  Logger.info(`Build IOS app...`)
  return await yarn(`build:eas ${buildArgs.join(' ').trim()}`)
}

module.exports = {
  buildIOS
}