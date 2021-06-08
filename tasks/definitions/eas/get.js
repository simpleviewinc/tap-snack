const { getPlatforms } = require('../../utils/getPlatforms')
const { sharedOptions, getTapRoot } = require('@keg-hub/cli-utils')

const getBuild = async args => {
  const { params } = args
  const { name, branch, tap } = params

  const { android, ios } = getPlatforms(params)
  const tapRoot = getTapRoot(params)

}

module.exports = {
  get: {
    name: 'get',
    example: 'eas get <options>',
    description : 'Gets an eas-build build based on passed in options',
    action: getBuild,
    options: sharedOptions(
      'eas get',
      {
        id: {
          description: 'Get a build by eas-cli build id. Overrides all other filters',
          example: "eas get --id <eas-cli-build-id>",
        },
      },
      [
        'android',
        'ios',
        'platform',
        'limit',
        'status',
        'location'
      ],
      'eas'
    ),
  }
}