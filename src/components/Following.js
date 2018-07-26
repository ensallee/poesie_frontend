//I had to use following and followers instead of users for following container and followers container b/c for some reason, the fetch for an individual user doesn't return who that particular user is following and followed by.

import React, { Component, Fragment } from 'react';
import { Card, Icon } from 'semantic-ui-react'

class Following extends Component {

  handleClick = () =>  {
    this.props.history.push(`/users/${this.props.id}/poems`)
  }

//again, I had to user localStorage.id here instead of using the current user in the store
  render() {
    return (
      <Card className="user-card font">
        <Card.Content className="font" onClick={this.handleClick}>
          <Card.Header className="font">{this.props.name}</Card.Header>
          <Card.Meta>
            <span className='date font'>{this.props.hometown}</span>
          </Card.Meta>
          <Card.Description className="font">{this.props.bio}</Card.Description>
        </Card.Content>
      </Card>
    )
  }
}

//this is what I would use for images if I enabled users to upload photos on register.
// <Image src='/images/avatar/large/matthew.png' />

export default Following;
