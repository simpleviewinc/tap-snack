const { isBool, exists } = require('@keg-hub/jsutils')

/**
 * Gets the eas-cli profile to use for the platform
 * @param {boolean} doBuild - Should the platform be built
 * @param {string} platform - Platform to get the profile for
 * @param {string} profile - Profile to use when ios and android are not defined
 *
 * @returns {string} - Profile to use when building the app
 */
const getProfile = (doBuild, platform, profile) => (
  doBuild && (!exists(platform) || isBool(platform) ? profile : platform)
)

/**
 * Gets the platforms to be built and the eas-cli profiles to use
 * @param {Object} params - Contains keys that define which platforms to build
 * @param {string} platform - Name of the platform to build ( ios | android | all )
 * @param {string|boolean} ios - IOS profile to build with or false
 * @param {string|boolean} android - Android profile to build with or false
 * @param {string} profile - Profile to use when ios and android are not defined
 *
 * @returns {Object} - Object containing the platforms to be built
 */
const getPlatforms = ({ platform, ios, android, profile }) => {
  const buildAll = Boolean(platform === 'all' && !ios && !android)
  const buildIOS = ios || platform === 'ios' || buildAll
  const buildAnd = android || platform === 'android' || buildAll

  // If no profile exists, just return the build status
  return !exists(profile)
    ? { ios: buildIOS, android: buildAnd }
    : {
        ios: getProfile(buildIOS, ios, profile),
        android: getProfile(buildAnd, android, profile)
      }
}

module.exports = {
  getPlatforms
}