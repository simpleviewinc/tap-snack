const { getParams } = require('../')

describe('getParams', () => {
  it('should get the mapped params by method and no others', () => {
    const result = getParams({ method: 'get', key: '123', shouldBeIgnored: true })
    expect(result).toEqual({
      publicKey: '123'
    })
  })

  it('should filter undefined params', () => {
    const params = { key: '123', meta: { wow: true }, platform: undefined }
    const result = getParams({ ...params, method: 'upsert' })
    expect(result).toEqual({
      publicKey: params.key,
      meta: params.meta
    })
  })
})