const { setSharedOptions } = require('@keg-hub/cli-utils')

/**
 * Creates an eas group for task options to allow sharing the options between tasks
 */
setSharedOptions({
  eas: {
    platform: {
      alias: [ 'plf', 'type' ],
      allow: ['android', 'ios', 'all'],
      description: 'The platform to run the eas command on. (android, ios, all)',
      example: '--platform and',
      default: 'all'
    },
    android: {
      alias: [ 'and' ],
      description: 'Run eas command for android. Value must be a profile in the eas.json',
      example: '--android staging',
      type: 'string',
    },
    ios: {
      alias: [ 'apple' ],
      description: 'Run eas command for ios. Value must be a profile in the eas.json',
      example: '--ios production',
      type: 'string',
    },
    profile: {
      alias: [ 'prof', 'pr' ],
      description: 'The eas build profile to used when ios and android are not set',
      example: '--profile production',
      default: 'preview'
    },
    location: {
      alias: [ 'loc', 'path' ],
      description: 'Location where the eas command is run. Ignored when tap option is passed',
      example: '--location path/to/tap',
      enforced: true
    },
    tap: {
      description: 'Name of the tap used when running the task. Must be a keg-cli linked tap.',
      example: '--tap <linked-tap-name>',
      enforced: true
    },
    cache: {
      description: 'Use cache from a previous eas command',
      example: '--cache',
      default: true,
    },
    local: {
      description: 'Run the eas command locally [experimental]',
      example: '--local',
      default: false,
    },
    interactive: {
      description: 'Toggle interactive mode when building the app',
      example: '--no-interactive',
      default: true,
    },
    credentials: {
      alias: [ 'creds' ],
      description: 'Validate build credentials before building',
      example: '--no-credentials',
      default: true,
    },
    configuration: {
      alias: [ 'config', 'conf' ],
      description: 'Validate project configuration before building',
      example: '--no-configuration',
      default: true,
    },
    limit: {
      alias: ['lm'],
      description: 'Limit the number of items returned from eas',
      example: "eas list --limit 5",
    },
    status: {
      alias: ['stat', 'st'],
      allow: ['in-queue', 'in-progress', 'errored', 'finished', 'canceled'],
      description: 'Filter which build items are returned from eas based on status',
      example: ''
    },
  }
}, true)
