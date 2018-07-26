import React from 'react';
import Adapter from './Adapter';
import { withRouter } from 'react-router';
// import { Button } from 'semantic-ui-react';
import { Button } from "react-bootstrap";

const LogoutButton = ({ to = "/", history }) => {
    return (
      <Button
        className="logout-button"
        onClick={() => {
          Adapter.logout();
          history.push(to);
        }}
      >
        Logout
      </Button>
    )
}

export default withRouter(LogoutButton);
