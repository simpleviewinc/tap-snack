const { sharedOptions } = require('@keg-hub/cli-utils')
const { git } = require('@keg-hub/git-lib')
const utilsPath = '../../utils'
const { getPlatforms } = require(`${utilsPath}/getPlatforms`)
const { getTapRoot } = require(`@keg-hub/cli-utils`)
const { callApi } = require(`${utilsPath}/appetize/callApi`)
const { eas } = require(`${utilsPath}/eas`)
const fs = require('fs')

/**
 * Pushes a build to appetize
 * @param {Object} options
 * @param {Object} options.url - url to a hosted simulator build
 * @param {string} options.platform - ios or android
 * @param {string} options.branch - branch of the tap that you are deploying 
 * @param {string} options.name - name tag of the tap your are deploying (e.g. evf-feature-branch)
 * @returns 
 */
const pushToAppetize = async (options={}) => {
  const { 
    platform, 
    url, 
    branch, 
    name 
  } = options

  const buildIdentifiers = {
    meta: { branch, name },
    platform,
  }

  return await callApi({
    method: 'upsert',
    url,
    filter: buildIdentifiers,
    ...buildIdentifiers,
  })
}

/**
 * Saves appetizeResults to disk, at `path`
 * @param {String} path - path to file to save
 * @param {Object} appetizeResults - result object of the appetize upload, to be stringified and saved to file
 */
const saveResults = (path, appetizeResults) => {
  const serialized = JSON.stringify(appetizeResults, null, 2)
  fs.writeFileSync(path, serialized)
}

/**
 * @param {string} tapRoot - the file path to the root of the tap
 * @returns {string} branch of tap located at tapRoot
 */
const getTapBranch = async tapRoot => {
  const branch = await git.branch.current({ location: tapRoot })
  if (!branch) throw new Error(`Could not find git branch for repo located at ${tapRoot}`)
  return branch.name
}

/**
 * Builds an app, then deploys it to Appetize
 * @param {Object} options
 * @param {string} options.tap - alias of tap to deploy 
 * @param {string} options.platform - ios or android
 * @param {string} options.location - optional explicit path to tap (unnecessary if options.tap is defined)
 * @param {boolean} options.skipBuild - if true, won't start a new eas build, but it will run the remaining steps
 * @returns 
 */
const deployApp = async (options={}) => {
  const { 
    platform, 
    tap, 
    location,
    skipBuild=false
  } = options

  // Get the tap root, so we can run the command from there 
  const tapRoot = getTapRoot({ tap, location })
  const tapBranch = await getTapBranch(tapRoot)

  // Build the app with the eas-cli for IOS
  !skipBuild && await eas.build({
    profile: platform.profile,
    platform: platform.key,
    location: tapRoot,
  })

  // find the build metadata we just uploaded
  const account = await eas.getAccountName({ location: tapRoot })
  const latestBuild = await eas.findLatestBuild(platform.key, tapRoot, account)
  if (!latestBuild )
    throw new Error(`No build was found for account=${account} and platform=${platform.key}`)

  // push the eas build to appetize
  return await pushToAppetize({ 
    platform: platform.key, 
    url: latestBuild.artifact, 
    branch: tapBranch,
    name: `${tap}-${tapBranch}`
  })
}

/**
 * Builds and mobile app using eas-cli, then uploads the result to appetize
 * @param {Object} args - arguments passed from the runTask method
 */
const deploy = async args => {
  const { params } = args

  const { android, ios } = getPlatforms(params)

  const results = {
    ios: ios && await deployApp({
      ...params,
      platform: { profile: ios, key: 'ios' }
    }),
    android: android && await deployApp({
      ...params,
      platform: { profile: android, key: 'android' }
    })
  }

  params.log && console.log(results)
  params.out && saveResults(params.out, results)
  return results
}

module.exports = {
  deploy: {
    name: 'deploy',
    alias: ['dp'],
    action: deploy,
    example: 'eas build <options>',
    description : 'Builds and deploys a tap to appetize',
    options: {
      skipBuild: {
        alias: ['skip'],
        description: 'skips the build step of this task',
      },
      out: {
        alias: ['save'],
        description: 'An optional path to save the appetize result object to, as JSON.',
      },
      log: {
        description: 'If true, logs out the results of the appetize upsert',
        default: true,
      },
      ...sharedOptions(`eas build`, {}, [
        'platform',
        'build',
        'android',
        'ios',
        'profile',
        'location',
        'tap',
        'name',
        'cache',
        'local',
        'interactive',
        'credentials',
        'configuration'
      ], 'eas')
    }
  }
}


