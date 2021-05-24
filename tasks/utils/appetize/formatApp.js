const { isStr, noOpObj, deepMerge } = require('@keg-hub/jsutils')

/**
 * Wraps JSON.parse in a try catch so no error is thrown
 * If an error is thrown, the content is added to an object under the name key
 * @type {function}
 * @private
 * @param {string} content - Data to be converted from JSON
 *
 * @returns {Object} - Parsed content as an object
 */
const parseJSON = content => {
  try {
    return JSON.parse(content)
  }
  catch (e){
    return isStr(content) ? { name: content } : noOpObj
  }
}

/**
 * Converts the app.note field into an object and stores it on the app.meta field
 * @type {function}
 * @exports
 * @param {Object} app - Object returned form the Appetize API
 *
 * @returns {Object} - Copy of the app object with the meta field added
 */
const formatApp = (app) => {
  return deepMerge(app, { meta: parseJSON(app.note) })
}

module.exports = {
  formatApp
}