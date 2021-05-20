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
  }
}, true)
