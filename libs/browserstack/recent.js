const { apiGet } = require('./api')
const { noOpArr, noOpObj, wordCaps } = require('@keg-hub/jsutils')
const { Logger } = require('@keg-hub/cli-utils')

/**
 * Property keys of an upload app object
 * @type {Object}
 */
const uploadKeys = [
  'uploaded_at',
  'app_version',
  'app_id',
  'app_url',
  'custom_id',
]

/**
 * Logs the most recently uploaded items returned from the BrowserStack API
 * @external
 * @type {function}
 * @param {Array<Object>} items - Array of app items returned from the BrowserStack API
 * 
 * @returns  {Void}
 */
const logResponse = (items=noOpArr) => {

  const joined = items.reduce((mapped, item) => {
    mapped[item.app_name] = mapped[item.app_name] || []
    mapped[item.app_name].push(item)

    return mapped
  }, {})

  Logger.empty()

  Object.entries(joined)
    .map(([ name, uploads]) => {

      Logger.blue(name)
      Logger.gray(`  Uploads:`)

      uploads.map(upload => {
        uploadKeys.map(key => {
          key === 'uploaded_at'
            ? Logger.pair(`    Date:`, new Date(upload.uploaded_at))
            : upload[key] &&
                Logger.pair(`    ${wordCaps(key.replace('app_', ''))}:`, upload[key])
        })
        Logger.empty()
      })
    })

  Logger.empty()
}


/**
 * Get the all most recent app uploads or by custom_id when arg.id is passed
 * @external
 * @type {function}
 * @param {Object} args - Defines options for the post request
 * @param {Object} id - Test ID thats used as the custom id in browserstack
 * 
 * @returns  {Promise<Object>} - Resolves to the request response
 */
const recent = async (args=noOpObj) => {
  const { id, limit, log } = args

  log && Logger.info(`Getting BrowserStack Apps...`)

  const resp = await apiGet({
    params: limit ? { limit } : noOpObj,
    url: `app-live/recent_apps/${id || ''}`,
  })

  log && logResponse(resp.data)

  return resp
}

module.exports = {
  recent
}