const { deploy } = require('../deploy')

jest.mock('../../../utils/eas/build')
jest.mock('../../../utils/eas/list')
jest.mock('../../../utils/eas/findBuild')
jest.mock('../../../utils/resolveTapRoot')

const { eas } = require('../../../utils/eas/eas')

describe('deploy', () => {

  it('should upload to eas depending on platform', async () => {
    const params = {
      ios: true, 
      tap: 'my_tap'
    }

    const results = await deploy.action({ params })

    expect(eas.build).toHaveBeenCalledWith(
      expect.objectContaining({
        params,
        location: expect.stringContaining(params.tap),
        platform: 'ios'
      })
    )

    expect(eas.findBuild).toHaveReturnedWith(
      expect.objectContaining({
        startedBy: 'lance.tipton',
        platform: 'iOS'
      })
    )

  })

})