// Load the local env file
require('dotenv').config()

// Set the shared options for the tasks
require('../utils/sharedOptions')

const eas = require('./eas')

module.exports = {
  ...require('./eas'),
  ...require('./appetize'),
}