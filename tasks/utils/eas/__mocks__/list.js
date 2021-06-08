const mockList = require('../../__mocks__/easList')

module.exports = {
  list: jest.fn(args => 
    Promise.resolve(
      args.options.format === 'json' 
        ? { json: mockList.jsonList, data: mockList.stringList }
        : { data: mockList.stringList }
    )
  )
}