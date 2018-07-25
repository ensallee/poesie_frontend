import React, { Component, Fragment } from 'react';
// import { connect } from 'react-redux'

class OtherUserProfile extends Component {
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
    let id = this.props.id
    let config = {
      method: "GET",
      headers: {"Content-Type": "application/json",
          "Authorization": localStorage.getItem('token')
        }
    }

    fetch(`http://localhost:4000/users/${id}`, config)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        username: data.username,
        displayName: data.display_name,
        hometown: data.hometown,
        bio: data.bio
      }, () => console.log('state on otheruserprofile after settting state', this.state))
    })
  }

  render() {
    return (
      <Fragment>
        <div className="user-details">
          <p>
          <h1>Name: {this.state.displayName}</h1>
          <h4>Location: {this.state.hometown}</h4>
          <h4>Bio: {this.state.bio}</h4>
          </p>
        </div>
      </Fragment>
    )
  }
}

export default OtherUserProfile;
