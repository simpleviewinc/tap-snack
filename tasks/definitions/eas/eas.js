
module.exports = {
  eas: {
    name: 'eas',
    example: 'keg tap eas <sub-task> <options>',
    description : 'Calls a task using the eas-cli',
    tasks: {
      ...require('./build'),
      ...require('./list'),
    },
    options: {}
  }
}