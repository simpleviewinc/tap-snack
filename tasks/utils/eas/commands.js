const { runCmd } = require('@keg-hub/cli-utils')
const { noOpArr, noOpObj, isArr, toStr, isObj } = require('@keg-hub/jsutils')
const { jsonOutput } = require('./helpers')

/**
 * Ensures the passed in args is an array
 * Also removes `eas` if it's the first argument of args
 * @param {Array|string} args - Arguments to pass to the eas-cli
 * 
 * @returns {Array} - args converted into an array
 */
const ensureArgsArr = args => {
  const asStr = isArr(args) ? args.join(' ').trim() : toStr(args) || ''
  const asArr = asStr.split(' ')

  asArr[0] === 'eas' && asArr.shift()

  return asArr
}

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
  const { format, ...opts } = options
  const resp = await runCmd(
    'eas',
    ensureArgsArr(args),
    opts,
    location
  )

  if (['eas-cli', 'outdated version'].every(substr => resp.data.includes(substr)))
    throw new Error('Your version of eas-cli is out of date. Please update before continuing.')

  isObj(resp) &&
    format === 'json' &&
    opts.exec &&
    (resp.json = jsonOutput(resp.data))

   return resp
}


module.exports = {
  easCli,
}