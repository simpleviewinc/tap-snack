import { useMemo } from 'react'
import appMap from '../utils/appMap/aptNameMap.json'
import { wordCaps } from "@keg-hub/jsutils";

export const useAppList = (selectedKey) => {
  const apps = useMemo(() => {
    return Object.entries(appMap)
      .reduce((items, [ key, apps ]) => {
        const [ app, ...split ] = key.split('-')
        const branch = split.join('-')
        Object.entries(apps)
          .forEach(([ publicKey, data ]) => {
            items.push({
              branch,
              ...data,
              key: publicKey,
              app: wordCaps(app),
            })
          })
        return items
      }, [])
  }, [])

  const active = useMemo(() => {
    return apps.find(app => app.publicKey === selectedKey)
  }, [apps, selectedKey])

  return { apps,  active }

}