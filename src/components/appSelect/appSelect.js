import './appSelect.css'
import { useCallback, useMemo } from 'react'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Typography from '@material-ui/core/Typography'
import { noPropArr } from '@keg-hub/jsutils'

const AppItem = props => {
  const { app, branch, updated, publicKey, selected, onSelect } = props

  const onClick = useCallback((event) => {
    onSelect(publicKey)
  }, [publicKey, onSelect])

  const title = useMemo(() => {
    return `${app} - ${branch || new Date(updated).toString().split(' GMT')[0]}`
  }, [app, branch, updated])

  return (
    <ListItem
      button
      selected={selected}
      onClick={onClick}
    >
      <Typography
        className='app-select-list-item'
        color='textSecondary'
        variant='body1'
      >
        {title}
      </Typography>
    </ListItem>
  )
}

const ListHeader = props => {

  return (
    <ListItem
      divider
      selected={false}
      className='app-select-header'
    >
      <Typography
        className='app-select-header-text'
        color='secondary'
        gutterBottom
        variant='h6'
      >
        App List
      </Typography>
    </ListItem>
  ) 
}

export const AppSelect = props => {
  const {apps=noPropArr, onSelect, selected} = props

  return (
    <div className='app-select-main' >
      <List
        component="nav"
        className='app-select-list'
      >
        <ListHeader />
        {apps.map((app, idx) => (
          <AppItem
            key={app.key}
            {...app}
            onSelect={onSelect}
            selected={app.publicKey === selected}
          />
        ))}
      </List>
    </div>
  )
}