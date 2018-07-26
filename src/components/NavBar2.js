//this was my attempt at a second custom nav bar, but I moved away from it b/c navlinks don't respond to hover events. I tried importing Radium, to no avail.

import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import LogoutButton from './LogoutButton'
import Adapter from './Adapter'

const NavBar = (props) => {

return (
  <div className="nav-bar-container">
  <ul className="second-nav-bar">
    <li className="nav-bar-item left"><NavLink exact to="/write">Poesie</NavLink></li>
    { Adapter.isLoggedIn() ?
      <Fragment>
      <li className="nav-bar-item left"><NavLink exact to={`/users/${localStorage.id}/poems`}>My Poems</NavLink></li>
      <li className="nav-bar-item left"><NavLink exact to="/users">Community</NavLink></li>
      <li className="nav-bar-item right"><LogoutButton /></li>
      </Fragment>
      :
      <Fragment>
      <li className="nav-bar-item right"><NavLink exact to="/register">Register</NavLink></li>
      <li className="nav-bar-item right"><NavLink exact to="/login">Log in</NavLink></li>
      </Fragment>
    }
    </ul>
    </div>
  )
}


export default NavBar;
