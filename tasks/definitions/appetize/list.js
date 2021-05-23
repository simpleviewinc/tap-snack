
const { sharedOptions } = require('@keg-hub/cli-utils')
const { listAllApps } = require('../../utils/appetize/listAllApps')

module.exports = {
  list: {
    name: 'list',
    example: 'appetize list <options>',
    description : 'List all uploaded appetize apps',
    action: listAllApps,
    options: sharedOptions(
      'appetize list',
      {},
      [
        'token',
        'log',
      ],
      'appetize'
    ),
  }
}