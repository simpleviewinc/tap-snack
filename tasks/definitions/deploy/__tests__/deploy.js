
jest.mock('@keg-hub/git-lib')
jest.mock('SnackTasks/utils/eas/build')
jest.mock('SnackTasks/utils/eas/list')
jest.mock('SnackTasks/utils/eas/findBuild')
jest.mock('SnackTasks/utils/eas/getAccountName')
jest.mock('SnackTasks/utils/resolveTapRoot')
jest.mock('SnackTasks/utils/appetize/callApi')

const { eas } = require('SnackTasks/utils/eas/eas')
const { deploy } = require('../deploy')
const { callApi } = require('SnackTasks/utils/appetize/callApi')
const { git } = require('@keg-hub/git-lib')

const { jsonList } = require('SnackTasks/utils/__mocks__/easList')
const expectedBuild = jsonList.find(build => build.id === '1a73893f-e667-451d-b186-047f509380c1')

const mockAppetiteResponses = {
  ios: {
    publicKey: 'test-public-key-ios',
    privateKey: 'test-private-key-ios',
    updated: '2021-05-27T20:59:22.317Z',
    email: 'michael.carolin@simpleviewinc.com',
    platform: 'ios',
    versionCode: 1,
    created: '2021-05-27T20:59:22.317Z',
    architectures: [],
    appPermissions: {},
    publicURL: 'https://appetize.io/app/e57kskdjfsadf9tdct1d4x28veq7jumx',
    appURL: 'https://appetize.io/app/ek9tdfadct1d4xn8h28vequpm',
    manageURL: 'https://appetize.io/manage/private_y1dfaakjwnhu735nwg5kauyc'
  },
  android: {
    publicKey: 'test-public-key-and',
    privateKey: 'test-private-key-and',
    updated: '2021-05-27T20:59:22.317Z',
    email: 'michael.carolin@simpleviewinc.com',
    platform: 'android',
    versionCode: 1,
    created: '2021-05-27T20:59:22.317Z',
    architectures: [],
    appPermissions: {},
    publicURL: 'https://appetize.io/app/e57k9tdct1d4xn8h28veq7jupm',
    appURL: 'https://appetize.io/app/e57k9tdct1d4xn8h28veq7jupm',
    manageURL: 'https://appetize.io/manage/private_y12k2pb49asdlfkjahu735nwg5kauyc'
  }
}

describe('deploy', () => {

  const branch = 'test-branch'
  const origLog = console.log

  beforeAll(() => {
    git.branch.current.mockReturnValue({ name: branch })
    callApi.mockReturnValue(mockAppetiteResponses.ios)
    console.log = jest.fn()
  })

  afterAll(() => {
    jest.resetAllMocks()
    console.log = origLog
  })

  it('should upload to eas depending on platform', async () => {
    const params = {
      ios: true, 
      tap: 'my_tap'
    }

    await deploy.action({ params })

    expect(eas.build).toHaveBeenCalledWith(
      expect.objectContaining({
        location: expect.stringContaining(params.tap),
        platform: 'ios',
      })
    )

    expect(eas.findBuild).toHaveReturnedWith(expectedBuild)

    const meta = {
      branch,
      name: `${params.tap}-${branch}`
    }

    expect(callApi).toHaveBeenCalledWith(
      expect.objectContaining({
        method: 'upsert',
        url: expectedBuild.artifact,
        meta,
        filter: {
          platform: 'ios',
          meta
        }
      })
    )

    expect(console.log).toHaveBeenCalledWith(
      expect.objectContaining({
        android: false,
        ios: mockAppetiteResponses.ios
      })
    )
  })

})