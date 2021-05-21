const { runCmd } = require('@keg-hub/cli-utils')
const { noOpArr, noOpObj } = require('@keg-hub/jsutils')


/**
 * Calls the eas cli from the command line and returns the response
 * @function
 * @param {Array} args - optional arguments to pass to the eas command
 * @param {Object} options - optional options to pass to the spawned child_process
 * @param {string} location - Path on the host machine when the command should be run
 *
 * @returns {Array|string} - JSON array of items || stdout from git cli call
 */
const easCli = async (args=noOpArr, options=noOpObj, location) => {
  args[0] === 'eas' && args.shift()
  return await runCmd('eas', args, options, location)
}


module.exports = {
  easCli,
}