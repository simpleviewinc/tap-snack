import axios from 'axios'
import { limbo } from '@keg-hub/jsutils' 

const appetizeUrl = token =>  `https://${token}@api.appetize.io/v1/apps`

export const getAppetizeApps = async token => {
  const [ err, resp ] = await limbo(axios.get(appetizeUrl(token)))

  return err ? { apps: [], error: err.message } : { apps: resp.data }
}