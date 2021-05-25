import './snack.css'
import { useCallback, useState } from 'react'
import { Appetize } from '../appetize'
import { AppSelect } from '../appSelect'
import Grid from '@material-ui/core/Grid'
import { useAppList } from '../../hooks/useAppList'
import { noOpObj } from '@keg-hub/jsutils'

export const SnackContainer = props => {

  const apps = useAppList()
  const [ selected, setSelected ] = useState(noOpObj)

  const onSelect = useCallback((publicKey) => {
    const app = apps.find(app => app.publicKey === publicKey)
    setSelected(app)
  }, [apps])

  return (
    <section className='snack-container-main' >
      <Grid
        edge="start"
        className="snack-container-grid"
        container
        spacing={3}
      >
        <Grid item xs={3}>
          <AppSelect
            apps={apps}
            onSelect={onSelect}
            selected={selected.name}
          />
        </Grid>
        <Grid item xs={9}>
          <Appetize app={selected} />
        </Grid>
      </Grid>
    </section>
  )
}