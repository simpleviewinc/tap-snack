const express = require('express')
const appetite = require('@keg-hub/appetite')
const { get } = require('@keg-hub/jsutils')

/**
 * 
 * Starts an expressjs server listening on the specified port. 
 * Send a get request to `/apps` to get a list of appetize apps for your account.
 * @param {Object} options 
 * @param {string} options.port = port to listen on. If omitted, will default to the value in process.env.PORT or 3000
 * @param {string} options.token = appetize api token. If omitted, tries process.env.TOKEN
 */
const start = (options={}) => {
  const {
    port=(process.env.PORT || 3000),
    token=process.env.TOKEN
  } = options

  if (!token)
    throw new Error('TOKEN env must be defined')

  const app = express()

  app.get('/', (_, res) =>
    res.send('To view the list of appetize apps, make a GET request to /apps')
  )

  app.get('/apps', async (_, res) => {
    try {
      const { status, data } = await appetite.getAll({ token })
      if (status !== 200) {
        const err = new Error('Get all failed')
        err.response = { status }
        throw err
      }

      const { data: apps } = data

      res.status(status).json(apps)
    }
    catch (err) {
      const status = get(err, 'response.status', 500)
      const message = status.toString() === '401'
        ? err.message + ' --- check your api token.'
        : err.message

      res.status(status).send(message)
    }
  })

  app.listen(port, () => {
    console.log(`Appetize app-list server listening on http://localhost:${port}`)
  })
}

module.exports = { start }
