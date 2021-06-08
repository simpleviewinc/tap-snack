// Load the local env file
require('dotenv').config()
require('module-alias-jest/register')

// Set the shared options for the tasks
require('../utils/sharedOptions')

module.exports = {
  ...require('./appetize'),
  ...require('./deploy'),
  ...require('./eas'),
  ...require('./tap'),
}