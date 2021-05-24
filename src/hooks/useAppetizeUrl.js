import { useMemo } from 'react'
import { useQueryParams }  from './useQueryParams'
import { getAppFromMap } from '../utils/appMap/getAppFromMap'

const appetizeUrl = `https://appetize.io/embed`
const aptPublicKey = process.env.REACT_APP_APT_PUBLIC_KEY

const resolvePublicKey = (publicKey, app) => {
  return publicKey || aptPublicKey || getAppFromMap(app)
}

/**
 * Builds an Appetize embed url
 * @param {Object} props - Query params object
 * 
 * @returns {string} - Url created from the props and query params
 * Looks like https://appetize.io/embed/0ybj4nd5vz50hkx7dhf17varzg?device=iphone6s&scale=75&orientation=portrait&osVersion=13.7
 */
export const useAppetizeUrl = (props) => {
  const {
    publicKey,
    ...altParams
  } = props


  const [params, setParams ] = useQueryParams(altParams)
  const appKey = resolvePublicKey(publicKey, params.app)

  const builtUrl = useMemo(() => {
    return appKey &&
      `${appetizeUrl}/${appKey}?` + 
      Object.entries(params)
        .reduce((joined, [ key, value ]) => `${joined}&${key}=${value}`)

  }, [
    params,
    appKey
  ])

  return [builtUrl, setParams]
}