const api = require('./api')

/**
 * 
 * @param {Object} options
 * @param {String} options.filePath - path to zipped simulator build
 * @returns 
 */
const upload = async ({ filePath, platform, token, url }) => {
  return await api.post({
    token,
    platform,
    filePath,
    url
  }, token)
}

module.exports = {
  upload
}