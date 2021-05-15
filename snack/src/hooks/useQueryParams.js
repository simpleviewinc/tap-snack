import { useState } from 'react'
import { registerUpdateParams, getParams } from '../utils/params'

/**
 * Default params used when query-params are not set
 * See here for more options: https://docs.appetize.io/core-features/playback-options
 */
const defaults = {
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
  const [ params, setParams ] = useState({ ...defaults, ...getParams() })
  registerUpdateParams(setParams)

  return [ params, setParams ]
}