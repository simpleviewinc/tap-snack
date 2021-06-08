const { exists } = require('@keg-hub/jsutils')

/**
 * Map of tap-snack param names to appetite-wrapper param names
 * (anything omitted is the same)
 */
const paramMap = {
  key: 'publicKey',
  file: 'filePath',
  filter: 'search',
}

const uploadKeys = [ 'token', 'url', 'note', 'meta', 'file', 'platform' ]

/**
 * Supported params by method
 */
const paramsByMethod = {
  getAll: [ 'token' ],
  upsert: [ ...uploadKeys, 'key', 'filter' ],
  update: [ ...uploadKeys, 'key' ],
  upload: uploadKeys,
  get: [ 'token', 'key' ],
  remove: [ 'token', 'key' ],
}

/**
 * 
 * @param {Object} params - params, from the task, to be mapped
 * @param {Array} acceptedKeys - valid param keys
 * @returns 
 */
const mapParamKeys = (params, acceptedKeys=[]) => {
  return Object.entries(params).reduce(
    (mapped, [ key, value ]) => {
      const actualKey = paramMap[key] || key
      exists(value) && 
        acceptedKeys.includes(key) && 
        (mapped[actualKey] = value)
      return mapped
    },
    {}
  )
}

/**
 * Gets the params based on the passed in method of the Appetize API
 * @type {function}
 * @exports
 * @param {Object} args - Data to pass as Appetize API params
 * @param {string} args.file - Local file path of a built app (IOS Simulator | Android)
 * @param {Object} args.filter - Contains values to filter match apps when calling Appetize API#find
 * @param {string} args.key - Public key of an Appetize app
 * @param {string} args.meta - Metadata of an app, added to Appetize app under the note field
 * @param {string} args.method - Appetize API method to be called
 * @param {string} args.platform - Platform of the app (IOS | Android)
 * @param {string} args.token - Appetize API token
 * @param {string} args.url - Url of a built app (IOS Simulator | Android)
 *
 * @returns {Object} - params for the Appetize API method
 */
const getParams = args => {
  const { method, ...params } = args

  return mapParamKeys(
    params,
    paramsByMethod[method]
  )
}

module.exports = {
  getParams
}