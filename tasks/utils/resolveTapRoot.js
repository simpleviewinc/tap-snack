const path = require('path')
const { snackRoot } = require('../paths')
const { get } = require('@keg-hub/jsutils')
const { getKegGlobalConfig, getAppRoot } = require('@keg-hub/cli-utils')


const resolveTapRoot = ({ tap, location }) => {
  const appRoot = getAppRoot()

  return path.join(appRoot, './') !== path.join(snackRoot, './')
    ? appRoot
    : get(getKegGlobalConfig(), `cli.taps.${tap}.path`, location)

}

module.exports = {
  resolveTapRoot
}