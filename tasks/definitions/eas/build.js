
const { eas } = require('../../utils/eas')
const { exists } = require('@keg-hub/jsutils')
const { getPlatforms } = require('../../utils/getPlatforms')
const { resolveTapRoot } = require('../../utils/resolveTapRoot')
const { sharedOptions } = require('@keg-hub/cli-utils')


const buildWithEAS = async ({ ios, android, name, branch, location, params }) => {
  const appName = branch ? `${name}-${branch}` : name

  // ----- Upload to eas to be built
  // ios && await eas.build({
  //   params,
  //   profile: ios,
  //   platform: 'ios',
  //   location,
  // })

  // android && await eas.build({
  //   params,
  //   profile: android,
  //   platform: 'android',
  //   location,
  // })
}

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

  const { android, ios } = getPlatforms(params)
  const tapRoot = resolveTapRoot(params)

  await buildWithEAS({
    ios,
    android,
    params,
    branch,
    name: name || tap,
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
    options: sharedOptions(`deploy`, {}, undefined, 'deploy')
  }
}