//this was my first navbar that I swapped out

import React, { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { Menu } from 'semantic-ui-react'
import Adapter from './Adapter'
import LogoutButton from './LogoutButton'
import { connect } from 'react-redux'

const NavBar = (props) => {
  // console.log('props inside NavBar', props)
  return (
    <Menu secondary size='massive'>
      <Menu.Item
        as={NavLink}
        exact to="/write"
        name='Poesie'
      />
        { Adapter.isLoggedIn() ?
          <Fragment>
            <Menu.Item
              as={NavLink}
              exact to={`/users/${localStorage.id}/poems`}
              name='MyPoems'
            />
            <Menu.Item
              as={NavLink}
              exact to="/users"
              name='Community'
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

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser
  }
}

export default connect(mapStateToProps)(NavBar);
