const path = require('path')
const snackRoot = path.join(__dirname, '../')
const configs = path.join(snackRoot, './configs')

module.exports = {
  configs,
  snackRoot,
  appMapPath: path.join(configs, './aptNameMap.json')
}