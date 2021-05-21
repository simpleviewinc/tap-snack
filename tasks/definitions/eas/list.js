const { eas } = require('../../utils/eas')
const { getPlatforms } = require('../../utils/getPlatforms')
const { resolveTapRoot } = require('../../utils/resolveTapRoot')

const listEasBuilds = async ({ ios, android, name, branch, location, params }) => {
  const urls = { ios: false, android: false }
  const appName = branch ? `${name}-${branch}` : name

  // ----- Upload to eas to be built
  // ios && await eas.list({
  //   params,
  //   platform: 'ios',
  //   location,
  //   events: { onStdOut: onStdOut(urls) }
  // })

  android && await eas.list({
    params,
    platform: 'android',
    location,
    // events: { onStdOut: onStdOut(urls) }
  })
  console.log(`--------- after ---------`)
  console.log(android)
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
    options: {
      android: {
        alias: [ 'and' ],
        description: 'Deploy an Android build. Value should be an android eas profile from the eas.json config.',
        example: 'deploy --android staging',
        type: 'string',
        default: 'preview'
      },
      ios: {
        alias: [ 'apple' ],
        description: 'Deploy an IOS build. Value should be an IOS eas profile from the eas.json config.',
        example: 'deploy --ios production',
        type: 'string',
        default: 'preview'
      },
      // TODO: add limit, status, and platform
    }
  }
}