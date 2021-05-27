module.exports = {
  eas: {
    ...require('./build'),
    ...require('./list'),
    ...require('./getLatestBuild'),
    ...require('./getAccountName'),
    ...require('./findBuild'),
  }
}