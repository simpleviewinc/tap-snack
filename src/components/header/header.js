import { wordCaps } from '@keg-hub/jsutils'
import './header.css'

const SNACK_NAME = wordCaps(process.env.REACT_APP_TAP_NAME || 'tap-snack')

const Settings = props => {

  return (
    <div className="settings-dropdown-main">
      <button
        className="settings-dropdown-toggle btn btn-secondary btn-sm dropdown-toggle"
        type="button"
        id="settingsDropDown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
      >
        Settings
      </button>
      <ul
        className="settings-dropdown-list dropdown-menu"
        aria-labelledby="settingsDropDown"
      >
        <li>
          <span className="dropdown-item" >Switch Device</span>
        </li>
        <li>
          <span className="dropdown-item" >Color</span>
        </li>
        <li>
          <span className="dropdown-item" >Other</span>
        </li>
      </ul>
    </div>
  )
}

export const Header = props => {
    return (
      <header className='header-main px-2 pt-2 border-bottom' >
       <div className='header-content row justify-content-start'>
          <div className='col' >
            <h3 className="header-title" >
              {SNACK_NAME}
            </h3>
          </div>
          <div className='col' >
            <div className='header-settings' >
              <Settings />
            </div>
          </div>
       </div>
      </header>
    )
}