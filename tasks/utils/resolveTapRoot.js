const path = require('path')
const { snackRoot } = require('../paths')
const { get } = require('@keg-hub/jsutils')
const { getKegGlobalConfig, getAppRoot } = require('@keg-hub/cli-utils')

/**
 * Finds the path to the a taps root folder based on passed in params
 * Uses the global keg-cli config to find a taps path when tap param exists
 * @param {Object} params - Options to help finding a taps root location
 * @param {string} params.tap - Name of a linked tap in the global keg-cli config
 * @param {string} params.location - Custom location of a tap ( Must be absolute )
 * 
 * @returns {string} - Path on the host machine to a tap's root folder
 */
const resolveTapRoot = ({ tap, location }) => {
  const appRoot = getAppRoot()

  return path.join(appRoot, './') !== path.join(snackRoot, './')
    ? appRoot
    : get(getKegGlobalConfig(), `cli.taps.${tap}.path`, location)

}

module.exports = {
  resolveTapRoot
}