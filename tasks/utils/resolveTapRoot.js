const path = require('path')
const { getKegGlobalConfig, getTapPath } = require('@keg-hub/cli-utils')
const { tryRequireSync } = require('@keg-hub/jsutils')

/**
 * @param {string} location 
 * @returns {string} - root package directory of a path located at `location`, or else null if none exists
 */
const getPathRoot = location => {
  if (location === '/')
    return null

  const nextPath = path.resolve(location, 'package.json')
  if (tryRequireSync(nextPath))
    return nextPath

  return getPathRoot(path.resolve(location, '..'))
}

/**
 * Finds the path to the a taps root folder based on passed in params
 * Uses the global keg-cli config to find a taps path when tap param exists
 * @param {Object} params - Options to help finding a taps root location
 * @param {string} params.tap - Name of a linked tap in the global keg-cli config
 * @param {string} params.location - Custom location of a tap ( Must be absolute )
 * @returns {string} - Path on the host machine to a tap's root folder
 */
const resolveTapRoot = ({ tap, location }) => {
  if (!tap && !location)
    throw new Error('Cannot resolve tap root without a tap alias or location string!', { tap, location })

  return location
    ? getPathRoot(location)
    : getTapPath(getKegGlobalConfig(), tap)
}

module.exports = {
  resolveTapRoot
}