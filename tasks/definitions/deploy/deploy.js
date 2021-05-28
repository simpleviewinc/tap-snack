const { sharedOptions } = require('@keg-hub/cli-utils')
const { git } = require('@keg-hub/git-lib')
const utilsPath = '../../utils'
const { getPlatforms } = require(`${utilsPath}/getPlatforms`)
const { resolveTapRoot } = require(`${utilsPath}/resolveTapRoot`)
const { callApi } = require(`${utilsPath}/appetize/callApi`)
const { eas } = require(`${utilsPath}/eas`)

/**
 * Pushes a build to appetize
 * @param {Object} options
 * @param {Object} options.build
 * @param {string} options.platform
 * @param {string} options.branch
 * @param {string} options.name
 * @returns 
 */
const pushToAppetize = async (options={}) => {
  const { 
    platform, 
    build, 
    branch, 
    name 
  } = options

  const { artifact: url } = build

  const identifiers = {
    meta: { branch, name },
    platform,
  }

  return await callApi({
    method: 'upsert',
    url,
    filter: identifiers,
    ...identifiers,
  })
}

/**
 * Finds the latest latest build for the platform and account
 * @param {string} platform 
 * @param {string} location 
 * @param {string} account 
 * @returns 
 */
const findLatestBuild = async (platform, location, account) => {
  const list = await eas.list({
    params: { format: 'json', env: 'local' },
    platform,
    location,
    options: {
      exec: true,
      format: 'json'
    }
  })

  return eas.findBuild(list.json, {
    platform,
    startedBy: account,
  })
}

/**
 * @returns {string} branch of tap located at tapRoot
 */
const getTapBranch = async tapRoot => {
  const branch = await git.branch.current({ location: tapRoot })
  if (!branch)
    throw new Error(`Could not find git branch for repo located at ${tapRoot}`)

  return branch.name
}

/**
 * Builds an app 
 * @param {Object} options
 * @param {string} options.tap - name of tap to deploy
 * @param {string} options.platform 
 * @param {boolean} options.skipBuild - if true, won't start a new eas build, but runs the other steps
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
  const tapRoot = resolveTapRoot({ tap, location })
  const tapBranch = await getTapBranch(tapRoot)

  // Build the app with the eas-cli for IOS
  !skipBuild && await eas.build({
    profile: platform.profile,
    platform: platform.key,
    location: tapRoot,
  })

  // find the build metadata we just uploaded
  const account = await eas.getAccountName({ location: tapRoot })
  const latestBuild = await findLatestBuild(platform.key, tapRoot, account)
  if (!latestBuild )
    throw new Error(`No build was found for account=${account} and platform=${platform.key}`)

  // push the eas build to appetize
  return await pushToAppetize({ 
    platform: platform.key, 
    build: latestBuild, 
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

  console.log(results)
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
        default: false,
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


