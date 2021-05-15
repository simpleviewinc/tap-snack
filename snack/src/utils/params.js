import { queryToObj, objToQuery, noOpObj, checkCall } from '@keg-hub/jsutils'

let SET_QUERY_PARAMS
/**
 * Handler for window.popstate events
 * Updates the redux store based on the updated url params
 * @function
 * @public
 * @export
 * @param {Object} event - Window pop state event
 *
 * @return {void}
 */
const listenToPopState = async event => {
  // TODO: re-render the app with new query params
  console.log(`--------- pop state ---------`)
}
window.addEventListener('popstate', listenToPopState)

/**
 * Registers an setState function to which will cause a re-render when called
 * @function
 * @public
 * @export
 * @param {Object} update - New query params to be added to the url
 * @param {boolean} merge - Should the update be merged with the current query params
 *
 * @return {void}
 */
export const registerUpdateParams = setQueryParams => {
  SET_QUERY_PARAMS=setQueryParams
}

/**
 * Updates the browsers url query params without reloading the window
 * @function
 * @public
 * @export
 * @param {Object} update - New query params to be added to the url
 * @param {boolean} merge - Should the update be merged with the current query params
 *
 * @return {void}
 */
export const setParams = (update=noOpObj, merge) => {
  const { location, history } = window

  const current = queryToObj(location.search)
  const query = merge ? { ...current, ...update } : update

  history.pushState(noOpObj, '', objToQuery(query))

  // Try to call the setState method to force a re-render with the new query
  checkCall(SET_QUERY_PARAMS, query)
}


/**
 * Gets the query params from the current url location
 * @function
 *
 * @returns {Object} query params as an object
 */
export const getParams = () => {
  return typeof document === 'undefined'
    ? noOpObj
    : queryToObj(document?.location?.search)
}