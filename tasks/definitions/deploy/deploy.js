const { sharedOptions } = require('@keg-hub/cli-utils')
const { git } = require('@keg-hub/git-lib')
const { getPlatforms } = require('SnackTasks/utils/getPlatforms')
const { resolveTapRoot } = require('SnackTasks/utils/resolveTapRoot')
const { callApi } = require('SnackTasks/utils/appetize/callApi')
const { eas } = require('SnackTasks/utils/eas')

const pushToAppetize = async ({ platform, build, branch, name }) => {
  const { 
    artifact: url,
  } = build

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
 * Finds the altest latest build for the platform and account
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
 * @param {string} platform 
 * @param {string} tap - name of tap to deploy
 * @returns 
 */
const deployApp = async (platform, tap) => {
  // Get the tap root, so we can run the command from there 
  const tapRoot = resolveTapRoot({ tap })
  const tapBranch = await getTapBranch(tapRoot)

  // Build the app with the eas-cli for IOS
  await eas.build({
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
    name: `${params.tap}-${tapBranch}`
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
    ios: ios 
      ? await deployApp(
        { profile: ios, key: 'ios' }, 
        params.tap, 
      )
      : 'not-deployed',
    android: android 
      ? await deployApp(
        { profile: android, key: 'android' }, 
        params.tap, 
      )
      : 'not-deployed'
  }

  console.log(results)
}

module.exports = {
  deploy: {
    name: 'deploy',
    alias: ['dp'],
    action: deploy,
    example: 'eas build <options>',
    description : 'Builds production builds of a tap',
    options: sharedOptions(`eas build`, {}, [
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


