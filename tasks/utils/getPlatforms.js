
const getPlatforms = ({ adhoc, platform, simulator, ios, android }) => {
  const buildAll = Boolean(platform === 'all' && !ios && !android)

  return {
    ios: ios || platform === 'ios' || buildAll,
    android: android || platform === 'android' || buildAll
  }
}

module.exports = {
  getPlatforms
}