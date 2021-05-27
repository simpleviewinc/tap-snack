/**
 * Helper for findBuild
 * @param {string} s1 
 * @param {string} s2 
 * @returns {string} checks that s1 doesn't exist, or equals s2 when lower case
 */
const checkMatch = (s1, s2) => (s1 === undefined) || (s1.toLowerCase() === s2.toLowerCase())

/**
 * @param {Array<Object>} builds - json result of calling eas.build
 * @param {Object} expected - EAS Build Object entries to filter by. Any that are omitted are not used.
 * @returns {Object} - the latest build that also matches the expected keys
 */
const findBuild = (builds, expected) => {
  const {
    platform,
    status='finished',
    startedBy,
    distribution,
    releaseChannel,
    artifact,
    logs,
  } = expected

  return builds.reduce(
    (latest, build) => {
      // check if the next build was started more recently than the current "latest"
      const isMoreRecent = !latest || (new Date(build.startedAt) > new Date(latest.startedAt))

      // check for the right build
      return (
        !isMoreRecent ||
        !checkMatch(platform, build.platform) ||
        !checkMatch(status, build.status) ||
        !checkMatch(startedBy, build.startedBy) ||
        !checkMatch(distribution, build.distribution) ||
        !checkMatch(releaseChannel, build.releaseChannel) ||
        !checkMatch(artifact, build.artifact) ||
        !checkMatch(logs, build.logs) ||
        !build.artifact || !build.artifact.length
      ) 
        ? latest
        : build
    },
    null
  )
}

module.exports = {
  findBuild
}