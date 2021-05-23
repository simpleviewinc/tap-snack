import appMap from './aptNameMap.json'
import { isObj } from '@keg-hub/jsutils'

/**
 * Gets the Appetize public key from the app map base on app name
 * @function
 * @public
 * @export
 * @param {string} name - Name of the app stored in the Appetize app note metadata
 *
 * @return {string} - public key matching the found app
 */
export const getAppFromMap = name => {
  const app = appMap[name]
  return isObj(app) ? Object.keys(app)[0] : undefined
}