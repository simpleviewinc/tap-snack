
const { eas } = require('../../utils/eas')
const { getPlatforms } = require('../../utils/getPlatforms')
const { resolveTapRoot } = require('../../utils/resolveTapRoot')
const { sharedOptions } = require('@keg-hub/cli-utils')

/**
 * Builds and mobile app using eas-cli
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
const buildApp = async args => {
  const { params } = args
  const { name, branch, tap } = params

  // Get the platform and profiles
  const { android, ios } = getPlatforms(params)

  // Get the tap root, so we can run the command from there 
  const tapRoot = resolveTapRoot(params)

  // Build the app with the eas-cli for IOS
  ios && await eas.build({
    params,
    profile: ios,
    platform: 'ios',
    location: tapRoot,
  })

  // Build the app with the eas-cli for Android
  android && await eas.build({
    params,
    profile: android,
    platform: 'android',
    location: tapRoot,
  })

}

module.exports = {
  build: {
    name: 'build',
    alias: ['bld', 'bl'],
    action: buildApp,
    example: 'eas build <options>',
    description : 'Builds production builds of a tap',
    options: sharedOptions(`deploy`, {}, undefined, 'eas')
  }
}