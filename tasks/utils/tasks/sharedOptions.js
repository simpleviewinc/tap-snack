const { setSharedOptions } = require('@keg-hub/cli-utils')

setSharedOptions({
  eas: {
    platform: {
      alias: [ 'plf', 'type' ],
      allow: ['android', 'ios', 'all'],
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
      description: 'Deploy an Android build. Value should be an android eas profile from the eas.json config.',
      example: 'deploy --android staging',
      type: 'string',
    },
    ios: {
      alias: [ 'apple' ],
      description: 'Deploy an IOS build. Value should be an IOS eas profile from the eas.json config.',
      example: 'deploy --ios production',
      type: 'string',
    },
    profile: {
      alias: [ 'prof', 'pr' ],
      description: 'EAS build profile to use when ios and android options are not set',
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
    name: {
      description: 'Name used to validate the app. Uses the tap options value when not set',
      example: 'deploy --name custom app build name',
    },
    cache: {
      description: 'Use cache from a previous build.',
      example: 'deploy --cache',
      default: true,
    },
    local: {
      description: 'Run the build locally [experimental]',
      example: 'deploy --local',
      default: false,
    },
    interactive: {
      description: 'Toggle interactive mode when building the app',
      example: 'deploy --no-interactive',
      default: true,
    },
    credentials: {
      alias: [ 'creds' ],
      description: 'Validate build credentials before building',
      example: 'deploy --no-credentials',
      default: true,
    },
    configuration: {
      alias: [ 'config', 'conf' ],
      description: 'Validate project configuration before building',
      example: 'deploy --no-configuration',
      default: true,
    }
  }
}, true)
