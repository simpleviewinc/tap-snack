const fs = require('fs')
const path = require('path')
const tar = require('tar-fs')
const { uuid } = require('@keg-hub/jsutils')
const TEMP_PATH = path.join(__dirname, `../../build`)

/**
 * Gets the tmp folder that stores the exported image .tar
 * Uses the __mocks__ folder when test argument is true
 * @function
 * @private
 * @param {string} folder - Name of the tar export folder within the tmp folder
 * @param {boolean} test - Is docply running in test mode
 *
 * @returns {string} - Path to the exported image tar folder
 */
const getTarFolder = (folder = uuid()) => {
  return path.join(TEMP_PATH, folder)
}

/**
 * Gets the path to the docker exported tar file
 * @function
 * @private
 * @param {string} folder - Name of the tar export folder within the tmp folder
 * @param {boolean} test - Is docply running in test mode
 *
 * @returns {string} - Path to the exported image tar folder
 */
const getTarPath = (tarName = uuid(), test) => {
  const tarPath = path.extname(tarName) === '.tar' ? tarName : `${tarName}.tar`
  return path.join(TEMP_PATH, tarPath)
}

const pack = (folder, tarName) => {
  const tarPath = getTarPath(tarName)

  return new Promise((res, rej) => {
    tar
      .pack(folder)
      .pipe(fs.createWriteStream(tarPath))
      .on('finish', () => res(tarPath))
      .on('error', err => rej(err))
  })
}

const unpack = (tarPath, folder) => {
  const tarFolder = getTarFolder(folder)

  return new Promise((res, rej) => {
    fs.createReadStream(tarPath)
      .pipe(tar.extract(tarFolder))
      .on('finish', () => res(tarFolder))
      .on('error', err => rej(err))
  })
}

module.exports = {
  pack,
  unpack,
}
