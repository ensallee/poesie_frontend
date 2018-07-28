import React, { Component, Fragment } from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button, HelpBlock } from "react-bootstrap";
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
      bio: "",
      selectedFile: null
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
        if (json.id !== undefined) {
          console.log('json after registering', json);
          localStorage.setItem('token', json.token);
          localStorage.setItem('id', json.id)
          this.props.setUser(json);
          this.props.history.push("/write");
        } else {
          alert("You must enter a unique username and password. Please try again.")
        }
      })
  }

  handleFileSelect = (event) => {
    console.log('event inside handleupload', event.target.files[0])
    this.setState({
      selectedFile: event.target.files[0]
    })
  }

  handleFileUpload = () => {
    console.log('inside handle file upload')
    var url = this.getBase64(this.state.selectedFile)
    console.log('url inside handleFileUpload', url)
    // image.src = getBase64Image(this.state.selectedFile)
    // document.body.appendChild(image)
  }

  getBase64 = (photo) => {
     let reader = new FileReader()
     let result
      reader.readAsDataURL(photo)
      reader.onloadend = () => {
        // result = reader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
        result = reader.result
        this.setState({
          selectedFile: result
        }, () => {console.log('after setting state', this.state.selectedFile);
          let image = new Image()
          image.src = this.state.selectedFile
          image.style={width: "500px", height: "800px"}
          document.body.appendChild(image)
      })
      }
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

            <FormGroup controlId="formHorizontalDisplayName">
              <Col componentClass={ControlLabel} sm={2}>
                Display Name
              </Col>
              <Col sm={10}>
                <FormControl name="display_name" value={this.state.display_name} onChange={this.handleChange} type="display_name" placeholder="Display Name" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalHometown">
              <Col componentClass={ControlLabel} sm={2}>
                Hometown
              </Col>
              <Col sm={10}>
                <FormControl name="hometown" value={this.state.hometown} onChange={this.handleChange} type="hometown" placeholder="Hometown" />
              </Col>
            </FormGroup>

            <FormGroup controlId="formHorizontalBio">
              <Col componentClass={ControlLabel} sm={2}>
                Bio
              </Col>
              <Col sm={10}>
                <FormControl name="bio" value={this.state.bio} onChange={this.handleChange} type="bio" placeholder="Bio" />
              </Col>
            </FormGroup>

            <FieldGroup
              id="formControlsFile"
              type="file"
              label="Upload a Profile Photo"
              onChange={this.handleFileSelect}>
            </FieldGroup>
            <Button type="button" onClick={this.handleFileUpload}>Upload</Button>

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

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
    </FormGroup>
  );
}
//
// function getBase64(photo) {
//    let reader = new FileReader()
//    let result
//     reader.readAsDataURL(photo)
//     reader.onloadend = () => {
//       result = reader.result.replace(/^data:image\/(png|jpeg|jpg);base64,/, '')
//       this.setState({
//         selectedFile: result
//       }, () => console.log('after setting state', this.state.selectedFile))
//     }
// }

// var reader = new FileReader();
// let result;
// reader.readAsDataURL(file);
// reader.onload = function () {
//   console.log('result of getBase64', reader.result);
//   result = reader.result
// };
// reader.onerror = function (error) {
//   console.log('Error: ', error);
// };


// function getBase64Image(img) {
//   var canvas = document.createElement("canvas");
//   canvas.width = img.width;
//   canvas.height = img.height;
//   var ctx = canvas.getContext("2d");
//   ctx.drawImage(img, 0, 0);
//   var dataURL = canvas.toDataURL("image/png");
//   return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
// }

// <input type="file" />

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (userInfo) => dispatch(setUser(userInfo))
  }
}

export default connect(null, mapDispatchToProps)(LogInForm2);
