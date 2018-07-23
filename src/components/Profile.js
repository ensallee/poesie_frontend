import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux'

class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      username: '',
      displayName: '',
      hometown: '',
      bio: ''
    }
  }

  componentDidMount() {
    console.log('props inside currentUser', this.props.currentUser)
    let config = {
      method: "GET",
      headers: {"Content-Type": "application/json",
          "Authorization": localStorage.getItem('token')
        }
    }
    fetch(`http://localhost:4000/users/${this.props.currentUser}`, config)
    .then(resp => resp.json())
    .then(data => {
      console.log('data after fetch inside profile', data);
      this.setState({
        username: data.username,
        displayName: data.display_name,
        hometown: data.hometown,
        bio: data.bio
      }, () => console.log('state on profile after settting state', this.state))
    })
  }

  render() {
    // console.log('current user inside profile', this.props.currentUser)
    return (
      <Fragment>
        <div className="user-details">
          <h1>Name: {this.state.displayName}</h1>
          <h6>Location: {this.state.hometown}</h6>
          <h6>Bio: {this.state.bio}</h6>
        </div>
      </Fragment>
    )
  }


}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
  }
}

export default connect(mapStateToProps)(Profile)
