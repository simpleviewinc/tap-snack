module.exports = {
  snack: {
    name: 'snack',
    alias: ['snk', 'sk'],
    example: 'keg tap snack <options>',
    description : 'Run tap snack commands',
    actions: {
      ...require('./deploy'),
    }
  }
}