import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Menu, Button } from 'semantic-ui-react'
import Adapter from './Adapter'
import LogoutButton from './LogoutButton'

const NavBar = (props) => {
  return (
    <Menu secondary size='massive'>
      <Menu.Item
        as={NavLink}
        exact to="/write"
        name='write'
      />
        { Adapter.isLoggedIn() ?
          <Fragment>
            <Menu.Item
              as={NavLink}
              exact to="/my_poems"
              name='MyPoems'
            />
          <Menu.Menu position='right'>
            <Menu.Item
              as={LogoutButton}
              name='logout'
            />
          </Menu.Menu>
          </Fragment>
          :
          <Fragment>
          <Menu.Menu position='right'>
            <Menu.Item
              as={NavLink}
              exact to="/register"
              name='register'
              color='blue'
          />
          <Menu.Item
              as={NavLink}
              exact to="/login"
              name='login'
              color='green'
            />
          </Menu.Menu>
        </Fragment>}
        </Menu>
  )
}

export default NavBar;
