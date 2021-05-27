const { easCli } = require('./commands')

/**
 * @param {Object} args.options - Options object passed to the task
 * @returns {string} - Built url for the android apk
 */
const getAccountName = async (args) => {
  const { 
    options={}, 
    location=process.cwd() 
  } = args

  const { data, error } = await easCli(
    [ 'account:view' ],
    { exec: true, ...options },
    location
  )

  if (error)
    throw new Error('[Error: getAccountName]:\n' + error.message)

  return data.trim()
}

module.exports = {
  getAccountName
}
