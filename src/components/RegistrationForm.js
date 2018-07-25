import React, { Component } from 'react';
import { Form, Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setUser } from '../actions';

class Register extends Component {
  state = {
    username: "",
    password: "",
    display_name: "",
    hometown: "",
    bio: "",
    currentUser: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();

    fetch(`http://localhost:4000/users/`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(json => {
        console.log('json after registering', json);
        localStorage.setItem('token', json.token);
        this.props.setUser(this.state.currentUser);
        this.props.history.push("/write");
      })
  }

  render() {
    return (
      <React.Fragment>
        <Grid>
          <Grid.Row centered>
            <Segment padded='very' style={{width: '40%'}}>
              <Form onSubmit={this.handleSubmit}>
                <Form.Input
                  label="Username"
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  value={this.state.username}
                />
                <Form.Input
                  label="Display Name"
                  type="display_name"
                  name="display_name"
                  placeholder="Display Name"
                  onChange={this.handleChange}
                  value={this.state.displayName}
                />
                <Form.Input
                  label="Hometown"
                  type="hometown"
                  name="hometown"
                  placeholder="Hometown"
                  onChange={this.handleChange}
                  value={this.state.hometown}
                />
                <Form.Input
                  label="Bio"
                  type="bio"
                  name="bio"
                  placeholder="Bio"
                  onChange={this.handleChange}
                  value={this.state.bio}
                />
                <Form.Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
              <Form.Button type="submit" color='blue' content="Register" />
            </Form>
          </Segment>
        </Grid.Row>
      </Grid>
    </React.Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => dispatch(setUser(userInfo))
  }
}

export default connect(null, mapDispatchToProps)(Register);
