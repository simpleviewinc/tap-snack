const { yarn, Logger } = require('@keg-hub/cli-utils')
const { appRoot, andRoot, andBundlePath } = require('../../paths')

const bundleAnd = async args => {
  Logger.info(`\nBundling javascript for Android...`)

  const buildArgs = [
    `bundle`,
    `--entry-file ${appRoot}/index.js`,
    `--platform android`,
    '--dev false',
    `--reset-cache`,
    `--bundle-output ${andBundlePath}`,
    `--assets-dest ${andRoot}/app/src/main/res/`
  ]

  return await yarn(`rn ${buildArgs.join(' ').trim()}`)
}

module.exports = {
  bundleAnd
}