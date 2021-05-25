import { useMemo, useState } from 'react'
import appMap from '../utils/appMap/aptNameMap.json'
import { wordCaps } from "@keg-hub/jsutils";


export const useAppList = props => {

  return useMemo(() => {
    const items = []

    Object.entries(appMap).map(([ key, apps ]) => {
      const [ app, ...split ] = key.split('-')
      const branch = split.join('-')
      Object.entries(apps).map(([ publicId, data ]) => {
        items.push({
          branch,
          ...data,
          key: publicId,
          app: wordCaps(app),
        })
      })
    })

    return items
  }, [appMap])

}