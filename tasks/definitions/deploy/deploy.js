
const { deployIOS, deployAnd, getPlatforms, resolveTapRoot } = require('../../utils')
const { sharedOptions, getAppRoot } = require('@keg-hub/cli-utils')

/**
 * Builds VisitApps App
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
const deployApp = async args => {
  const { params } = args
  const { android, ios } = getPlatforms(params)
  const tapRoot = resolveTapRoot(params)

  console.log(`--------- tapRoot ---------`)
  console.log(tapRoot)

  console.log(`--------- params ---------`)
  console.log(params)

}

module.exports = {
  deploy: {
    name: 'deploy',
    alias: ['bld', 'bl'],
    action: deployApp,
    example: 'keg tap deploy <options>',
    description : 'Builds production builds of a tap with eas then deploys the builds to appetize',
    options: sharedOptions(`deploy`, {}, undefined, 'deploy')
  }
}