
const { deployIOS, deployAnd, getPlatforms } = require('../../utils')
const { sharedOptions } = require('@keg-hub/cli-utils')
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

  console.log(`--------- params ---------`)
  console.log(params)

  // const { android, ios } = getPlatforms(params)
  // android && await deployAnd(args)
  // ios && await deployIOS(args)
}

module.exports = {
  deploy: {
    name: 'deploy',
    alias: ['bld', 'bl'],
    action: deployApp,
    example: 'keg tap snack deploy <options>',
    description : 'Builds simulator builds of a tap, then deploys them to appetize',
    options: sharedOptions(`snack deploy`, {}, undefined, 'deploy')
  }
}