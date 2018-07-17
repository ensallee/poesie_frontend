import React from 'react';
import { NavLink } from 'react-router-dom';
import { Input, Menu, Button } from 'semantic-ui-react'

const NavBar = (props) => {
  return (
  <Menu secondary size='big'>
    <Menu.Item
      as={NavLink}
      exact to="/write"
      name='write'
    />
    <Menu.Item
      as={NavLink}
      exact to="/my_poems"
      name='myPoems'
    />
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
  </Menu>
  )
}

export default NavBar;




// return (
//   <Menu secondary size='big'>
//     <Menu.Item
//       as={NavLink}
//       exact to="/"
//       name='home'
//     />
//   { Adapter.isLoggedIn() ?
//     <Fragment>
//       <Menu.Item
//         as={NavLink}
//         exact to="/my_recipes"
//         name='myRecipes'
//       />
//       <Menu.Item
//         as={NavLink}
//         exact to="/new_recipe"
//         name='addARecipe'
//       />
//     <Menu.Menu position='right'>
//       <Menu.Item
//         as={LogoutButton}
//         name='logout'
//       />
//     </Menu.Menu>
//     </Fragment>
//     :
//     <Fragment>
//     <Menu.Menu position='right'>
//       <Menu.Item
//         as={NavLink}
//         exact to="/register"
//         name='register'
//         color='blue'
//     />
//     <Menu.Item
//         as={NavLink}
//         exact to="/login"
//         name='login'
//         color='green'
//       />
//     </Menu.Menu>
//   </Fragment>}
//   </Menu>
// )
