const path = require('path')
const snackRoot = path.join(__dirname, '../')

module.exports = {
  snackRoot,
  configs: path.join(snackRoot, './configs'),
}