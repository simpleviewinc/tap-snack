const FormData = require('form-data')
const axios = require('axios')
const fs = require('fs')

const defaultReqConfig = {
  maxContentLength: Infinity,
  maxBodyLength: Infinity,
}

const buildForm = data => {
  const form = new FormData()
  Object.entries(data).map(
    ([key, value]) => form.append(key, value)
  )
  return form
}

const getRequestConfig = (form, token) => ({
  ...defaultReqConfig,
  headers: getHeaders(form, token)
})

const getHeaders = (form, token) => ({
  ...form.getHeaders(),
  ...(token && { Authorization: `Bearer ${token}`})
})

/**
 * Get the data for the filePath
 * @param {Object} options
 * @param {Object} extra 
 * @returns 
 */
const getBinaryData = ({filePath, token }, extra) => {
  const form = buildForm({ 
    file: fs.createReadStream(filePath),
    ...extra
  })

  return {
    data: form,
    requestConfig: getRequestConfig(form, token) 
  }
}

/**
 * Get the data for the url
 * @param {Object} options
 * @param {Object} extra 
 * @returns 
 */
const getURLData = ({ url, token }, extra) => {
  const form = buildForm({
    url,
    ...extra
  })

  return {
    data: form,
    requestConfig: getRequestConfig(form, token)
  }
}


const post = async ({ token, version='1', filePath, url, platform }) => {
  const endpoint = `https://${token}@api.appetize.io/v${version}/apps`

  const extra = { platform }

  const { data, requestConfig } = filePath 
    ? getBinaryData({ filePath, token }, extra)
    : url
      ? getURLData({ url, token }, extra)
      : {}

  console.log('Uploading....',  { requestConfig, endpoint })
  // return Promise.resolve({})

  try {
    return await axios.post(endpoint, data, requestConfig)
  }
  catch (err) {
    console.error(err)
  }
}

module.exports = {
  post
}