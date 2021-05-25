
const { sharedOptions } = require('@keg-hub/cli-utils')
const { callApi } = require('../../utils/appetize/callApi')

/**
 * Removes an app from the Appetize API based on its public key
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.params - Passed in options, converted into an object
 * @param {Object} args.params.key - app build public key
 *
 * @returns {void}
 */
const removeApp = async args => {
  const { params, globalConfig } = args
  await callApi(
    { ...params, method: 'remove' },
    globalConfig
  )
  console.log('App build removed!\n')
}

module.exports = {
  remove: {
    name: 'remove',
    example: 'appetize remove <options>',
    description : 'Removes an app build from your Appetize account',
    action: removeApp,
    options: sharedOptions(
      'appetize remove',
      {},
      [
        'token',
        'key'
      ],
      'appetize'
    ),
  }
}