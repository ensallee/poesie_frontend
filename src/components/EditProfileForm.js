import React, { Component, Fragment } from 'react'
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from "react-bootstrap";

class EditProfileForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleChange = this.handleChange.bind(this);

    this.state = {
      id: "",
      displayName: "",
      hometown: "",
      bio: ""
    };
  }

  componentDidMount() {
    let config = {
      method: "GET",
      headers: {"Content-Type": "application/json",
          "Authorization": localStorage.getItem('token')
        }
    }
    // fetch(`http://localhost:4000/users/${this.props.currentUser}`, config)
    //again, this.props.currentUser worked at first, but on refresh, it's an empty object so I had to user localStorage.
    fetch(`http://localhost:4000/users/${localStorage.id}`, config)
    .then(resp => resp.json())
    .then(data => {
      // console.log('this before debuggger', this)
      // debugger
      // console.log('data after fetch inside profile', data);
      this.setState({
        id: data.id,
        displayName: data.display_name,
        hometown: data.hometown,
        bio: data.bio,
      })
    })
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    }, () => console.log('this.state inside edit profile', this.state))
  }

  handleSubmit = (event) => {
    event.preventDefault();

    let body = {
      user: {
        display_name: this.state.displayName,
        hometown: this.state.hometown,
        bio: this.state.bio
      }
    }

    let config = {
      method: 'PATCH',
      headers: {
        "Content-Type": 'application/json',
        "Authorization": localStorage.getItem('token')
      },
      body: JSON.stringify(body)
    }

    fetch(`http://localhost:4000/users/${this.state.id}`, config)
    .then(resp => resp.json())
    .then(() => this.props.history.push(`/users/${this.state.id}/poems`))
  }

  render() {
    return (
      <Fragment>
        <div className="form">
          <h3>Edit Your Profile</h3>
          <Form onSubmit={this.handleSubmit} horizontal>
            <FormGroup controlId="formHorizontalUsername">
              <Col componentClass={ControlLabel} sm={2}>
                Display Name
              </Col>
              <Col sm={10}>
                <FormControl name="displayName" value={this.state.displayName} onChange={this.handleChange} type="displayName" placeholder="Display Name" />
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
                <Button type="submit">Save Changes</Button>
              </Col>
            </FormGroup>
          </Form>
        </div>
      </Fragment>
    )
  }
}

export default EditProfileForm;
