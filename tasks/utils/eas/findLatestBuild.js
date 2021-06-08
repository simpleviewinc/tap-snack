const { list } = require('./list')
const { findBuild } = require('./findBuild')

/**
 * Finds the latest latest build for the platform and account
 * @param {string} platform - ios or android
 * @param {string} location - local file path of expo project for which to list builds 
 * @param {string} account - the expo account name (i.e. result of running the command "eas account:view")
 * @returns 
 */
 const findLatestBuild = async (platform, location, account) => {
  const apps = await list({
    params: { format: 'json' },
    platform,
    location,
    options: {
      exec: true,
      format: 'json'
    }
  })

  return findBuild(apps.json, {
    platform,
    startedBy: account,
  })
}

module.exports = { findLatestBuild }