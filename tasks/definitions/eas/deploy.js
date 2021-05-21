
const { eas } = require('../../utils/eas')
const { exists } = require('@keg-hub/jsutils')
const { getPlatforms } = require('../../utils/getPlatforms')
const { resolveTapRoot } = require('../../utils/resolveTapRoot')
const { sharedOptions } = require('@keg-hub/cli-utils')

const onStdOut = urls => {
  return (data) => {
    console.log(`--------- data ---------`)
    console.log(data)
    // TODO parse urls from data
    // urls.ios = parsedIOSUrl
    // urls.android = parsedAndUrl
  }
}


const buildWithEAS = async ({ ios, android, name, branch, location, params }) => {
  const urls = { ios: false, android: false }
  const appName = branch ? `${name}-${branch}` : name

  // ----- Upload to eas to be built
  // ios && await eas.build({
  //   params,
  //   profile: ios,
  //   platform: 'ios',
  //   location,
  //   events: { onStdOut: onStdOut(urls) }
  // })

  // android && await eas.build({
  //   params,
  //   profile: android,
  //   platform: 'android',
  //   location,
  //   events: { onStdOut(urls) }
  // })
}

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
  deploy: {
    name: 'deploy',
    alias: ['bld', 'bl'],
    action: deployApp,
    example: 'keg tap deploy <options>',
    description : 'Builds production builds of a tap with eas then deploys the builds to appetize',
    options: sharedOptions(`deploy`, {}, undefined, 'deploy')
  }
}