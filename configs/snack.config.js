require('dotenv').config()

const {
  APT_API_AUTH,
  APT_PUBLIC_KEY,
  TAP_NAME='tap-snack',
} = process.env

module.exports = {
  appetize: {
    apiAuth: APT_API_AUTH,
    publicKey: APT_PUBLIC_KEY,
  },
  tapName: TAP_NAME
}