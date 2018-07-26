import React, { Component } from 'react';
import { Form, Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setUser } from '../actions';

class Login extends Component {
  state = {
    username: "",
    password: ""
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    fetch(`http://localhost:4000/sessions/`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(json => {
        localStorage.setItem('token', json.token);
        //I had to save id to local storage because of the refresh issue with current user that I have throughout this app. I use localStorage.id throughout, rather than the currentUser inside state.
        localStorage.setItem('id', json.id);
          this.props.setUser(json);
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
                  label='Username'
                  type="text"
                  name="username"
                  placeholder="Username"
                  onChange={this.handleChange}
                  value={this.state.username}
                />
                <Form.Input
                  label="Password"
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
              <Form.Button type="submit" color='white' content="Login" />
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

export default connect(null, mapDispatchToProps)(Login)
