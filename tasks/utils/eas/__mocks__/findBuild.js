const { findBuild } = jest.requireActual('../findBuild')

module.exports = {
  findBuild: jest.fn(findBuild)
}