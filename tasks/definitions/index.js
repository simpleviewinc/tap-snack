// Load the local env file
require('dotenv').config()

// Set the shared options for the tasks
require('../utils/sharedOptions')

module.exports = {
  ...require('./appetize'),
  ...require('./deploy'),
  ...require('./eas'),
  ...require('./tap'),
}