const fs = require('fs')
const path = require('path')
const axios = require('axios')
const FormData = require('form-data')
const { throwError } = require('./throwError')
const { deepMerge, isEmpty, limbo, noOpObj, pickKeys } = require('@keg-hub/jsutils')

const defReq = {
  url: '',
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


const apiPost = async () => {

}

module.exports = {
  setAuth,
  apiPost
}