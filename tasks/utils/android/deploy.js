const { buildAnd } = require('./build')
// const { bundleAnd } = require('./bundle')

const { Logger } = require('@keg-hub/cli-utils')

const deployAnd = async args => {
  const { params } = args
  Logger.info(`\nDeploying Android app...\n`)
  // params.bundle && await bundleAnd(args)
  params.build && await buildAnd(args)

}

module.exports = {
  deployAnd
}