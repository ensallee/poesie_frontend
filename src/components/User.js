import React, { Component } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'

class User extends Component {

  handleClick = () =>  {
    this.props.history.push(`/users/${this.props.id}/poems`)
  }

  toggleButton(user) {
    if (user.followers.find(u => u.id == localStorage.id)) {
      return <button className="unfollow-button" onClick={() => this.props.unFollow(this.props.id)}>Unfollow</button>
    } else {
      return <button className="follow-button" onClick={() => this.props.handleFollow(this.props.id)}>Follow</button>
    }
  }

//again, I had to user localStorage.id here instead of using the current user in the store
  render() {
    console.log('props inside profile', this.props)
    return (
      <Card className="user-card font">
        <Card.Content onClick={this.handleClick}>
          {this.props.images.length !== 0 ? <img className="card-photo" src={`${this.props.images[this.props.images.length -1].image.url}`}/> : <img className="card-photo" src={require("../images/placeholder_avatar.png")}/>}
          <Card.Header style={{fontFamily: "Open Sans, sans-serif"}}>{this.props.name}</Card.Header>
          <Card.Meta>
            <span className='date font'>{this.props.hometown}</span>
          </Card.Meta>
          <Card.Description className='font'>{this.props.bio}</Card.Description>
        </Card.Content>
        <Card.Content className="font" extra>
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

//this is what I would use if my users had images.
// <Image src='/images/avatar/large/matthew.png' />

export default connect(mapStateToProps)(User);
