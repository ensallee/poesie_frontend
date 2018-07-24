import React, { Component, Fragment } from 'react';
import { Card, Icon } from 'semantic-ui-react'
// import { withRouter } from 'react-router';

class User extends Component {

  handleClick = () =>  {
    // console.log('inside handle click of User')
    this.props.history.push(`users/${this.props.id}/poems`)
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
        <Card.Content extra>
            <Icon name='user' />
            {this.props.followers.length} Followers | {this.props.following.length} Following
            <br></br>
            <br></br>
            {localStorage.id != this.props.id ? <button onClick={() => this.props.handleFollow(this.props.id)} className="follow-button">Follow</button> : null }
        </Card.Content>
      </Card>
    )
  }
}

// <Image src='/images/avatar/large/matthew.png' />

export default User;
