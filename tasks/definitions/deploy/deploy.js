
const { sharedOptions } = require('@keg-hub/cli-utils')
const { getPlatforms } = require('../../utils/getPlatforms')
const { resolveTapRoot } = require('../../utils/resolveTapRoot')
const { callApi } = require('../../utils/appetize/callApi')
const { eas } = require('../../utils/eas')

const pushToAppetize = (platform, build, branch) => {
  const { 
    artifact: url,
  } = build

  const identifiers = {
    meta: { branch },
    platform,
  }

  callApi({
    method: 'upsert',
    url,
    ...identifiers,
    search: identifiers
  })
}

const getLatestBuild = async (platform, location) => {
  const list = await eas.list({
    params: { format: 'json', env: 'local' },
    platform,
    location,
    options: {
      exec: true,
      format: 'json'
    }
  })

  const account = await eas.getAccountName({ location })

  return eas.findBuild(list.json, {
    platform,
    startedBy: account,
  })
}

const getTapBranch = () => 'test-branch'

const deployApp = async (platform, params) => {
  // Get the tap root, so we can run the command from there 
  const tapRoot = resolveTapRoot(params)
  const tapBranch = getTapBranch(tapRoot)

  // Build the app with the eas-cli for IOS
  await eas.build({
    params,
    profile: platform.profile,
    platform: platform.key,
    location: tapRoot,
  })

  const latestBuild = await getLatestBuild(platform.key, tapRoot)

  return await pushToAppetize(platform, latestBuild, tapBranch)
}

/**
 * Builds and mobile app using eas-cli, then uploads the result to appetize
 * @param {Object} args - arguments passed from the runTask method
 */
const deploy = async args => {
  const { params } = args

  const { android, ios } = getPlatforms(params)

  if (ios) {
    const result = await deployApp(
      { profile: ios, key: 'ios' }, 
      params, 
    )
    console.log('iOS Result: ', result)
  }
  if (android) {
    const result = await deployApp(
      { profile: android, key: 'android' }, 
      params, 
    )
    console.log('Android Result: ', result)
  }
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


