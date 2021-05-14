const { Logger } = require('@keg-hub/cli-utils')
const { isStr } = require('@keg-hub/jsutils')


const throwError = (error) => {
  const err = isStr(error) ? new Error(error) : error

  err.stack
    ? Logger.error(err.stack)
    : Logger.error(`An unknown error occurred!`, err)
  Logger.empty()

  process.exit(1)
}

module.exports = {
  throwError
}