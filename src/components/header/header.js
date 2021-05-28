import { useCallback, useState } from 'react'
import { wordCaps } from '@keg-hub/jsutils'
import './header.css'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import SettingsIcon from '@material-ui/icons/Settings'
import Typography from '@material-ui/core/Typography'

const SNACK_NAME = wordCaps(process.env.REACT_APP_TAP_NAME || 'tap-snack')

const Settings = props => {
  const [ anchorEl, setAnchorEl ] = useState(null)

  const openMenu = useCallback((event) => {
    setAnchorEl(event.currentTarget)
  }, [])

  const closeMenu = useCallback(() => {
    setAnchorEl(null)
  }, [])

  return (
    <div className="settings-dropdown-main">
      <Button
        aria-controls="settings-menu"
        aria-haspopup="true"
        color="primary"
        onClick={openMenu}
        startIcon={<SettingsIcon />}
      >
        Settings
      </Button>
      <Menu
        id="settings-menu"
        className="settings-menu"
        anchorEl={anchorEl}
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={closeMenu}
      >
        <MenuItem onClick={closeMenu}>
          Switch Device
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          Color
        </MenuItem>
        <MenuItem onClick={closeMenu}>
          Other
        </MenuItem>
      </Menu>
    </div>
  )
}


export const Header = props => {
  return (
    <AppBar
      className='header-main'
      position='static'
      color='transparent'
      elevation={0}
    >
      <Toolbar>
        <Grid
          edge="start"
          className='header-content'
          container
          spacing={3}
        >
          <Grid item xs={8}>
            <Typography variant='h6' className="header-title" >
              {SNACK_NAME}
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Settings />
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  )
}