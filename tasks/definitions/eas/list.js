const { eas } = require('../../utils/eas')
const { getPlatforms } = require('../../utils/getPlatforms')
const { resolveTapRoot } = require('../../utils/resolveTapRoot')
const { sharedOptions } = require('@keg-hub/cli-utils')

const listEasBuilds = async ({ ios, android, name, branch, location, params }) => {
  const urls = { ios: false, android: false }
  const appName = branch ? `${name}-${branch}` : name

  // ----- List the eas builds
  ios && await eas.list({
    params,
    platform: 'ios',
    location,
  })

  android && await eas.list({
    params,
    platform: 'android',
    location,
  })
}

const listBuilds = async args => {
  const { params } = args
  const { name, branch, tap } = params

  const { android, ios } = getPlatforms(params)
  const tapRoot = resolveTapRoot(params)

  await listEasBuilds({
    ios,
    android,
    params,
    branch,
    name: name || tap,
    location: tapRoot,
  })

}

module.exports = {
  list: {
    name: 'list',
    alias: ['ls'],
    example: 'eas list <options>',
    description : 'Lists the app builds built with the eas-cli',
    action: listBuilds,
    options: sharedOptions('eas list', {
      limit: {
        alias: ['lm'],
        description: 'Limit the number of items returned from eas',
        example: "eas list --limit 5",
      },
      status: {
        alias: ['stat', 'st'],
        allow: ['in-queue', 'in-progress', 'errored', 'finished', 'canceled'],
        description: 'Filter the returned items by status',
        example: ''
      },
    }, ['android', 'ios', 'platform', 'location'], 'eas'),
  }
}