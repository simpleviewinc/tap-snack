const { exists } = require('@keg-hub/jsutils')

/**
 * Checks if item exists and if it does, adds it the params object
 * @type {function}
 * @private
 * @param {*} item - Value to check if exists
 * @param {Object} params - Object to add the item to if it exists
 * @param {string} key - Name of the field to store of item under on the param object
 *
 * @returns {Void}
 */
const addIfExists = (item, params, key) => {
  return exists(item) && (params[key] = item)
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
  const {
    file,
    filter,
    key,
    meta,
    note,
    method,
    platform,
    token,
    url
  } = args

  const params = { token }

  switch(method){
    case 'getAll': {
      break
    }
    case 'get': 
    case 'remove': {
      addIfExists(key, params, 'publicKey')
      break
    }
    case 'upsert': {
      addIfExists(url, params, 'url')
      addIfExists(note, params, 'note')
      addIfExists(meta, params, 'meta')
      addIfExists(key, params, 'publicKey')
      addIfExists(file, params, 'filePath')
      addIfExists(filter, params, 'search')
      addIfExists(platform, params, 'platform')
      break
    }

    case 'upload': {
      addIfExists(url, params, 'url')
      addIfExists(note, params, 'note')
      addIfExists(meta, params, 'meta')
      addIfExists(file, params, 'filePath')
      addIfExists(platform, params, 'platform')
      break
    }

    case 'update': {
      params.publicKey = key
      addIfExists(url, params, 'url')
      addIfExists(note, params, 'note')
      addIfExists(meta, params, 'meta')
      addIfExists(file, params, 'filePath')
      addIfExists(key, params, 'publicKey')
    }
  }

  return params
}

module.exports = {
  getParams
}