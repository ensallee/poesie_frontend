import React, { Component, Fragment } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
// import { withRouter } from 'react-router';

class User extends Component {

  handleClick = () =>  {
    console.log('inside handle click of User')
    this.props.history.push(`users/${this.props.id}/poems`)
  }

  render() {
    return (
      <Card>
        <Card.Content onClick={this.handleClick}>
          <Card.Header>{this.props.name}</Card.Header>
          <Card.Meta>
            <span className='date'>{this.props.hometown}</span>
          </Card.Meta>
          <Card.Description>{this.props.bio}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <a>
            <Icon name='user' />
            22 Friends
          </a>
        </Card.Content>
      </Card>
    )
  }
}

// <Image src='/images/avatar/large/matthew.png' />

export default User;
