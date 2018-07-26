import React, { Component, Fragment } from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from "react-bootstrap";
import { connect } from 'react-redux';
import { setUser } from '../actions';

class LogInForm2 extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      username: "",
      password: "",
      display_name: "",
      hometown: "",
      bio: ""
    };
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
        localStorage.setItem('id', json.id)
        this.props.setUser(json);
        this.props.history.push("/write");
      })
  }

  render() {
    return (
      <Fragment>
        <div className="form">
          <h3>Sign up</h3>
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

            <FormGroup controlId="formHorizontalUsername">
              <Col componentClass={ControlLabel} sm={2}>
                Display Name
              </Col>
              <Col sm={10}>
                <FormControl name="display_name" value={this.state.display_name} onChange={this.handleChange} type="display_name" placeholder="Display Name" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalUsername">
              <Col componentClass={ControlLabel} sm={2}>
                Hometown
              </Col>
              <Col sm={10}>
                <FormControl name="hometown" value={this.state.hometown} onChange={this.handleChange} type="hometown" placeholder="Hometown" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalUsername">
              <Col componentClass={ControlLabel} sm={2}>
                Bio
              </Col>
              <Col sm={10}>
                <FormControl name="bio" value={this.state.bio} onChange={this.handleChange} type="bio" placeholder="Bio" />
              </Col>
            </FormGroup>

            <FormGroup>
              <Col smOffset={1} sm={10}>
                <Button type="submit">Sign up</Button>
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
