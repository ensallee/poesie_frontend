import React, { Component } from 'react';
import { Card } from 'semantic-ui-react'
// import { withRouter } from 'react-router';

class Follower extends Component {

  handleClick = () =>  {
    // console.log('inside handle click of User')
    this.props.history.push(`/users/${this.props.id}/poems`)
  }

//again, I had to user localStorage.id here instead of using the current user in the store
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
      </Card>
    )
  }
}

// <Image src='/images/avatar/large/matthew.png' />

export default Follower;
