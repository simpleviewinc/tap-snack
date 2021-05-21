const { setSharedOptions } = require('@keg-hub/cli-utils')

setSharedOptions({
  deploy: {
    platform: {
      alias: [ 'plf', 'type' ],
      description: 'Name of the platform to be built. (android, ios, all)',
      example: 'deploy --platform and',
      default: 'all'
    },
    bundle: {
      alias: [ 'bun' ],
      description: 'Bundle the app javascript before deploying',
      example: 'deploy --no-bundle',
      default: true
    },
    build: {
      alias: [ 'bld' ],
      description: 'Build the app before deploying',
      example: 'deploy --no-build',
      default: true
    },
    android: {
      alias: [ 'and' ],
      description: 'Deploy an Android build',
      example: 'deploy --android',
    },
    ios: {
      alias: [ 'apple' ],
      description: 'Deploy an IOS build',
      example: 'deploy --ios',
    },
    profile: {
      alias: [ 'prof', 'pr' ],
      description: 'EAS build profile to use',
      example: 'deploy --profile production',
      default: 'preview'
    },
    location: {
      alias: [ 'loc', 'path' ],
      description: 'Location of the tap on the host machine to be deployed. Ignored when tap option is passed',
      example: 'deploy --location path/to/tap',
      enforced: true
    },
    tap: {
      description: 'Name of the tap to be deployed. Must be a keg-cli linked tap.',
      example: 'deploy --tap <linked-tap-name>',
      enforced: true
    },
  }
}, true)
