// const { bundleIOS } = require('./bundle')
const { buildIOS } = require('./build')

const deployIOS = async args => {
  const { params } = args
  // params.bundle && await bundleIOS(args)
  params.build && await buildIOS(args)

}

module.exports = {
  deployIOS
}