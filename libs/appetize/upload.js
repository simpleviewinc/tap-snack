const path = require('path')
const { apiPost } = require('./api')
const { throwError } = require('./throwError')
const { noOpObj } = require('@keg-hub/jsutils')
const { Logger } = require('@keg-hub/cli-utils')


const upload = async ({ file }) => {

  return await apiPost({

  })
}

module.exports = {
  upload
}