const { stringList, jsonList } = require('../../__mocks__')
const { jsonOutput } = require('../helpers')

describe(`jsonOutput`, () => {

  it(`should convert a string list into a json list`, () => {
    const asJson = jsonOutput(stringList)
    expect(asJson).toEqual(jsonList)
  })

})
