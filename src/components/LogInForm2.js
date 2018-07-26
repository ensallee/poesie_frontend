import React, { Component, Fragment } from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { setUser } from '../actions';

class LogInForm2 extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: '',
      password: ''
    };
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
      <Fragment>
        <div className="form">
          <h3>Log in</h3>
          <Form onSubmit={this.handleSubmit} horizontal>
            <FormGroup controlId="formHorizontalUsername">
              <Col componentClass={ControlLabel} sm={2}>
                Username
              </Col>
              <Col sm={10}>
                <FormControl name="username" value={this.state.username} onChange={this.handleChange} type="username" placeholder="Username" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalPassword">
              <Col componentClass={ControlLabel} sm={2}>
                Password
              </Col>
              <Col sm={10}>
                <FormControl name="password" value={this.state.password} onChange={this.handleChange} type="password" placeholder="Password" />
              </Col>
            </FormGroup>

            <FormGroup >
              <Col smOffset={1} sm={10}>
                <Button type="submit">Sign in</Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </Fragment>
    )
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => dispatch(setUser(userInfo))
  }
}

export default connect(null, mapDispatchToProps)(LogInForm2);
