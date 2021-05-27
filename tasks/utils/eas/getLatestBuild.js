const { easCli } = require('./commands')
const { error } = require('@keg-hub/cli-utils')

const getAbsoluteLatest = async (location, options={}) => {
  return await easCli(
    [ 'build:view' ],
    options,
    location
  )
}

/**
 * Uses the eas cli to build an app in the expo cloud servers
 * Creates a link like 
 * @param {Object} args.params - Options object passed to the task
 * 
 * @returns {string} - Built url for the android apk
 */
const getLatestBuild = async (args) => {
  const {
    location=process.cwd(),
    buildId,
  } = args

  ;(!location && !buildId) &&
    error.throwError(`Eas CLI "view" method requires either location or buildId params`)


  return getAbsoluteLatest(location)
}

module.exports = {
  getLatestBuild
}
