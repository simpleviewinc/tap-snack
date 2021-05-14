const { apiRemove } = require('./api')
const { noOpObj } = require('@keg-hub/jsutils')
const { Logger } = require('@keg-hub/cli-utils')
const { throwError } = require('./throwError')

/**
 * Deletes an uploaded app from BrowserStack
 * @external
 * @type {function}
 * @param {Object} args - Defines options for the post request
 * @param {Object} args.id - BrowserStack ID
 * 
 * @returns  {Promise<Object>} - Resolves to the request response
 */
const remove = async (args=noOpObj) => {
  const { id, log } = args

  !id && throwError(`Remove method requires a BrowserStack app ID!`)

  log && Logger.pair(`Removing BrowserStack app with ID`, id)

  const resp = await apiRemove({
    url: `app-live/app/delete/${id}`,
  })

  log && Logger.success(`App was removed from BrowserStack!\n`)

  return resp
}

module.exports = {
  remove
}