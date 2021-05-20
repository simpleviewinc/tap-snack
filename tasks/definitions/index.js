// Set the shared options for the tasks
require('../utils/tasks/sharedOptions')

module.exports = {
  ...require('./snack'),
  ...require('./deploy'),
}