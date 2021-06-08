module.exports = {
  eas: {
    ...require('./build'),
    ...require('./list'),
    ...require('./getAccountName'),
    ...require('./findBuild'),
    ...require('./findLatestBuild'),
  }
}