const fs = require('fs')
const path = require('path')
const axios = require('axios')
const FormData = require('form-data')
const { throwError } = require('./throwError')
const { deepMerge, isEmpty, limbo, noOpObj, pickKeys } = require('@keg-hub/jsutils')

const defReq = {
  url: 'https://api-cloud.browserstack.com',
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'content-type': 'application/json',
  },
  responseType: 'json',
}

const authToBase64 = (user, pass) => {
  const basic = pass ? `${user}:${pass}` : user
  const encoded = Buffer.from(basic, 'utf8').toString('base64')

  return { Authorization: `Basic ${encoded}` }
}


const getUrl = url => ({
  url: url.startsWith('/') ? `${defReq.url}${url}` : `${defReq.url}/${url}`,
})

const addFiles = (form, files) => {
  return Object.entries(files)
    .reduce((form, [name, loc]) => {
      form.append(name, fs.createReadStream(loc))

      return form
    }, form)
}

const addData = (form, data) => {
  return Object.entries(data)
    .reduce((form, [name, value]) => {
      form.append(name, JSON.stringify(value))

      return form
    }, form)
}

/**
 * Allows setting global auth for the browserstack API
 * @external
 * @type {function}
 * @param {Object} user - User for authorizing with browserstack
 * @param {Object} pass - Password for the user
 */
const setAuth = (user, pass) => {
  Object.assign(defReq, { headers: authToBase64(user, pass) })
}

const buildHeaders = (auth=noOpObj, ...headers) => ({
  headers: deepMerge(
    defReq.headers,
    ...headers,
    auth.user && authToBase64(auth.user, auth.pass)
  )
})

const handelResponse = (err, res) => {
  return err
    ? throwError(err)
    : pickKeys(res, [ 'data', 'headers', 'status', 'statusText' ])
}

/**
 * Make a post request to the BrowserStack API
 * @external
 * @type {function}
 * @param {Object} request - Defines options for the post request
 * @param {string} request.url - API endpoint to hit
 * @param {Object} request.files - Files to send in the request
 * @param {Object} request.data - Form data to send in the request
 * @param {Object} request.headers - Extra headers to pass in the request
 * @param {Object} request.auth - User and password to authorize with the api
 * 
 * @returns {Promise<Object>} - Response from the BrowserStack API
 */
const apiPost = async request => {
  const { auth=noOpObj, data=noOpObj, files=noOpObj, headers=noOpObj, url } = request

  const form = new FormData()
  !isEmpty(files) && addFiles(form, files)
  !isEmpty(data) && addData(form, data)

  const [ err, res ] = await limbo(axios({
    ...deepMerge(
        defReq,
        getUrl(url),
        buildHeaders(auth, headers, form.getHeaders()),
        { method: 'POST', maxBodyLength: Infinity, maxContentLength: Infinity }
    ),
    data: form,
  }))

  return handelResponse(err, res)
}

/**
 * Make a get request to the BrowserStack API
 * @external
 * @type {function}
 * @param {Object} request - Defines options for the post request
 * @param {string} request.url - API endpoint to hit
 * @param {Object} request.params - Params to pass in the request
 * @param {Object} request.headers - Extra headers to pass in the request
 * @param {Object} request.auth - User and password to authorize with the api
 * 
 * @returns {Promise<Object>} - Response from the BrowserStack API
 */
const apiGet = async (request=noOpObj) => {
  const { auth=noOpObj, headers=noOpObj, params=noOpObj, url } = request

  const [ err, res ] = await limbo(axios(
    deepMerge(
      defReq,
      getUrl(url),
      buildHeaders(auth, headers),
      { params },
    )
  ))

  return handelResponse(err, res)
}

/**
 * Make a delete request to the BrowserStack API
 * @external
 * @type {function}
 * @param {Object} request - Defines options for the post request
 * @param {string} request.url - API endpoint to hit
 * @param {Object} request.headers - Extra headers to pass in the request
 * @param {Object} request.auth - User and password to authorize with the api
 * 
 * @returns {Promise<Object>} - Response from the BrowserStack API
 */
const apiRemove = async (request=noOpObj) => {
  const { auth=noOpObj, headers=noOpObj, url } = request

  const [ err, res ] = await limbo(axios(
    deepMerge(
      defReq,
      getUrl(url),
      buildHeaders(auth, headers),
      { method: 'DELETE' }
    )
  ))

  return handelResponse(err, res)
}

module.exports = {
  apiGet,
  apiPost,
  apiRemove,
  setAuth,
}