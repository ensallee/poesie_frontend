import React, { Component, Fragment } from 'react';
import { Card, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'

class User extends Component {

  handleClick = () =>  {
    this.props.history.push(`/users/${this.props.id}/poems`)
  }

  toggleButton(user) {
    if (user.followers.find(u => u.id == localStorage.id)) {
      return <button onClick={() => this.props.unFollow(this.props.id)} className="follow-button">Unfollow</button>
    } else {
      return <button onClick={() => this.props.handleFollow(this.props.id)} className="follow-button">Follow</button>
    }
  }



//again, I had to user localStorage.id here instead of using the current user in the store
  render() {
    console.log('props inside profile', this.props)
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
            {localStorage.id != this.props.id ? this.toggleButton(this.props.user) : null }
        </Card.Content>
      </Card>
    )
  }
}

//this isn't doing anything for me.
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
    loading: state.currentUser.loading
  }
}

// <Image src='/images/avatar/large/matthew.png' />

export default connect(mapStateToProps)(User);
