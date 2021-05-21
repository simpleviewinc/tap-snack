// Set the shared options for the tasks
require('../utils/tasks/sharedOptions')

const eas = require('./eas')

module.exports = {
  ...require('./eas'),
}