
module.exports = {
  appetize: {
    name: 'appetize',
    alias: [ 'apt' ],
    example: 'keg tap appetize <sub-task> <options>',
    description : 'Calls a task using the appetize-cli',
    tasks: {
      ...require('./generate'),
      ...require('./get'),
      ...require('./list'),
    },
  }
}