import React, { Component } from 'react';
import { Form, Grid, Segment } from 'semantic-ui-react';
import { connect } from 'react-redux';
import { setUser } from '../actions';

class Login extends Component {
  state = {
    username: "",
    password: "",
    currentUser: {}
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    console.log('state inside login', this.state)
    // this.props.setUser(this.state);
    // this.props.history.push("/write"); //I commented this out because of async issues with my original approach
    //
    fetch(`http://localhost:4000/sessions/`, {
      method: 'POST',
      headers: {
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(this.state)
    })
      .then(res => res.json())
      .then(json => {
        console.log('json inside login before setting state', json)
        localStorage.setItem('token', json.token);
        //is this okay?
        localStorage.setItem('id', json.id);
        //try to get rid of set state and just go into reducer with json.id
        this.setState({
          currentUser: json.id
        }, () => {
          this.props.setUser(this.state.currentUser);
          this.props.history.push("/write");
        })
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
              <Form.Button type="submit" color='green' content="Login" />
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
