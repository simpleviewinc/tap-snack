const { asyncCmd } = require('@keg-hub/spawn-cmd')

const buildSimulatorBundle = ({ path, workspace, scheme, configuration='Debug', platform='ios' }) => {
  const { error, data, exitCode } = asyncCmd(
    `cd ${path} && xcodebuild -sdk iphonesimulator -workspace ${workspace}.xcworkspace/ -scheme ${scheme} -configuration ${configuration}`
  )
}

module.exports = { buildSimulatorBundle }