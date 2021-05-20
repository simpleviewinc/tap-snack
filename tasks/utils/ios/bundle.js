const { yarn, Logger } = require('@keg-hub/cli-utils')
const { appRoot, iosRoot, iosBundlePath } = require('../../paths')

const bundleIOS = async args => {
  Logger.info(`\nBundling javascript for IOS...`)

  const buildArgs = [
    `bundle`,
    `--entry-file ${appRoot}/index.js`,
    `--platform ios`,
    '--dev false',
    `--reset-cache`,
    `--bundle-output ${iosBundlePath}`,
    `--assets-dest ${iosRoot}`
  ]

  return await yarn(`rn ${buildArgs.join(' ').trim()}`)
}

module.exports = {
  bundleIOS
}