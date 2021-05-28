import './snack.css'
import { Appetize } from '../appetize'
import { AppSelect } from '../appSelect'
import Grid from '@material-ui/core/Grid'
import { get } from '@keg-hub/jsutils'
import { useCallback } from 'react'
import { useAppList } from '../../hooks/useAppList'
import { useQueryParams } from '../../hooks/useQueryParams'
import { useAppetizeUrl } from '../../hooks/useAppetizeUrl'


export const SnackContainer = props => {

  const [params, setParams] = useQueryParams(props)
  const { url, publicKey } = useAppetizeUrl(params)
  const { apps } = useAppList(publicKey)

  const onSelect = useCallback((publicKey) => {
    const app = apps.find(app => app.publicKey === publicKey)
    const name = get(app, 'meta.name', get(app, 'name'))
    setParams({ app: name }, true)
  }, [apps, params, setParams])

  const onSettingChange = useCallback((key, value) => {
    setParams({ [key]: value }, true)
  }, [params, setParams])

  const backColor = params.deviceColor === 'white'
    ? `background-dark`
    : `background-light`

  return (
    <section className='snack-container-main' >
      <Grid
        edge="start"
        className="snack-container-grid"
        container
        spacing={3}
      >
        <Grid
          item
          xs={4}
          lg={3}
          xl={1}
          className='app-select-grid'
        >
          <AppSelect
            apps={apps}
            onSelect={onSelect}
            selected={publicKey}
          />
        </Grid>
        <Grid
          item
          xs={8}
          lg={9}
          xl={11}
          className={`apt-grid ${backColor}`}
        >
          <Appetize
            url={url}
            onSettingChange={onSettingChange}
          />
        </Grid>
      </Grid>
    </section>
  )
}