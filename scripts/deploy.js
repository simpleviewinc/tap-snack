require('dotenv').config()
const path = require('path')
const appRoot = path.join(__dirname, '../')
const { setAppRoot, yarn, error } = require('@keg-hub/cli-utils')
setAppRoot(appRoot)

const snackConfig = require('../configs/snack.config.js')
const { eas } = require('../libs/eas')
const { appetize } = require('../libs/appetize')


const onStdOut = urls => {
  return (data) => {
    // TODO parse urls from data
    // urls.ios = parsedIOSUrl
    // urls.android = parsedAndUrl
  }
}

const deployApps = async args => {
  const {
    ios,
    and,
    android=and,
    name,
    branch,
    location=process.cwd(),
  } = args

  const urls = { ios: false, android: false }
  const appName = branch ? `${name}-${branch}` : name

  // ----- Upload to eas to be built
  ios && await eas({
    profile: ios,
    platform: 'ios',
    location,
    events: { onStdOut(urls) }
  })

  // android && await eas({
  //   profile: android,
  //   platform: 'android',
  //   location,
  //   events: { onStdOut(urls) }
  // })

  // ----- Upload builds to appetize


  // urls.ios && appetize.upsert({
  //   note: appName,
  //   url: urls.ios,
  //   token: snackConfig.apiAuth
  // })

  // urls.android && appetize.upsert({
  //   note: appName,
  //   url: urls.android,
  //   token: snackConfig.apiAuth
  // })

}