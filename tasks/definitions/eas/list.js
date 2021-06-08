const { eas } = require('../../utils/eas')
const { getPlatforms } = require('../../utils/getPlatforms')
const { sharedOptions, Logger, getTapRoot } = require('@keg-hub/cli-utils')
const { noOpObj, get } = require('@keg-hub/jsutils')

/**
 * List eas builds based on passed in options
 * @param {Object} args - arguments passed from the runTask method
 * @param {string} args.command - Root task name
 * @param {Object} args.tasks - All registered tasks of the CLI
 * @param {string} args.task - Task Definition of the task being run
 * @param {Array} args.options - arguments passed from the command line
 * @param {Object} args.globalConfig - Global config object for the keg-cli
 * @param {string} args.params - Passed in options, converted into an object
 *
 * @returns {void}
 */
const listBuilds = async args => {
  const { params } = args
  const { log, format } = params
  const asJson = format === 'json'
  const options = asJson ? { exec: true, format } : noOpObj

  const { android, ios } = getPlatforms({ ...params, profile: true })
  const tapRoot = getTapRoot(params)

  // List the eas builds for IOS
  const iosResp = ios && await eas.list({
    params,
    options,
    platform: 'ios',
    location: tapRoot,
  }) || []

  // Get the json items is needed
  const items = (asJson && iosResp)
    ? get(iosResp, 'json', [])
    : iosResp

  // List the eas builds for Android
  const andResp = android && await eas.list({
    params,
    options,
    platform: 'android',
    location: tapRoot,
  }) || []

  // Join the json items from IOS and Android
  const allItems = (asJson && andResp)
    ? items.concat(get(andResp, 'json', []))
    : items

  log && Logger.log(allItems)

  return allItems
}

module.exports = {
  list: {
    name: 'list',
    alias: ['ls'],
    example: 'eas list <options>',
    description : 'Lists the app builds built with the eas-cli',
    action: listBuilds,
    options: sharedOptions('eas list', {
      format: {
        alias: ['fmt'],
        description: 'Format of the response from the eas-cli',
        example: '--format json',
      },
      log: {
        description: 'Log the response from the eas-cli',
        example: '--no-log',
        default: true
      }
    }, [
      'android',
      'ios',
      'platform',
      'location',
      'status',
      'limit'
    ], 'eas'),
  }
}