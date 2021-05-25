import { useState } from 'react'
import { registerUpdateParams, getParams, setParams } from '../utils/params'

/**
 * Default params used when query-params are not set
 * See here for more options: https://docs.appetize.io/core-features/playback-options
 */
const defParams = {
  device: 'iphone11pro',
  scale: '75',
  orientation: 'portrait',
  deviceColor: 'white',
  // autoplay: false,
  // centered: false,
  // screenOnly: false,
  // launchUrl: <deep-link-url>,
  // params: JSON.stringify({}),
}

export const useQueryParams = props => {
  const urlParams = getParams()
  const [ params, setParamsState ] = useState({ ...defParams, ...urlParams })

  // If no params are set, the update the url with the joined defaults
  ;(!urlParams.device || !urlParams.app) && setParams(params)

  // Register out updater method, so we can force re-render when params change
  registerUpdateParams(setParamsState)

  return [ params, setParams ]
}