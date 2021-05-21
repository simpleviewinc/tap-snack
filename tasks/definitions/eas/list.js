const { eas } = require('../../utils/eas')
const { getPlatforms } = require('../../utils/getPlatforms')
const { resolveTapRoot } = require('../../utils/resolveTapRoot')
const { sharedOptions } = require('@keg-hub/cli-utils')


const listBuilds = async args => {
  const { params } = args

  const { android, ios } = getPlatforms({ ...params, profile: true })
  const tapRoot = resolveTapRoot(params)

  // ----- List the eas builds
  ios && await eas.list({
    params,
    platform: 'ios',
    location: tapRoot,
  })

  android && await eas.list({
    params,
    platform: 'android',
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
    options: sharedOptions('eas list', {}, [
      'android',
      'ios',
      'platform',
      'location',
      'status',
      'limit'
    ], 'eas'),
  }
}