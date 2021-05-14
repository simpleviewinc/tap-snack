const { recent, upload, remove, setAuth } = require('../libs/browserstack')

const ipaPath = path.join(__dirname, '../build/tap-vaa-develop.ipa')
const log = true
const id = 'test-custom-id'
const limit = 3

;(async () => {

  // setAuth('<BrowserStack Auth>')

  // await upload({
  //   id,
  //   log,
  //   file: ipaPath
  // })

  // await recent({
  //   id,
  //   log,
  //   limit,
  // })

  // await remove({
  //   log,
  //   id: '<BrowserStack-App-ID>',
  // })

})()