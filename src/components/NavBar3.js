import React, { Fragment } from 'react';
import { Link } from "react-router-dom";
import { Nav, Navbar, NavItem } from "react-bootstrap";
import LogoutButton from './LogoutButton'
import Adapter from './Adapter'

const NavBar = (props) => {
  return (
    <Navbar fluid collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/write">Poesie</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
        { Adapter.isLoggedIn() ?
        <Fragment>
        <Nav>
          <NavItem href={`/users/${localStorage.id}/poems`}>My Poems</NavItem>
          <NavItem href='/users'>Community</NavItem>
        </Nav>
        <Nav pullRight>
          <LogoutButton />
        </Nav>
        </Fragment>
        :
          <Fragment>
          <Nav pullRight>
            <NavItem href="/register">Register</NavItem>
            <NavItem href="/login">Log In</NavItem>
          </Nav>
          </Fragment>
        }
        </Navbar.Collapse>
      </Navbar>
    )
  }

  export default NavBar
