const aliases = require('module-alias-jest/register')
const rootDir = require('path').join(__dirname, '..')

module.exports = {
  rootDir,
  moduleNameMapper: aliases.jest
}