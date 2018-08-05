import React, { Component, Fragment } from 'react';
import { Form, FormGroup, FormControl, Col, ControlLabel, Button } from "react-bootstrap";

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
      filename: '',
      user_id: ''
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();
    let id = this.props.location.pathname.split('/')[2]

    const data = new FormData();
    // console.log('uploadInput file', this.uploadInput.files[0])
    data.append('image', this.state.image);
    data.append('filename', this.state.filename)
    data.append('user_id', this.state.user_id)

    fetch('http://localhost:4000/images', {
      method: 'POST',
      body: data,
    })
    .then(resp => resp.json())
    .then(json => {
      this.props.history.push(`/users/${id}/poems`)
    })
  };

  seeImage = (e) => {
    console.log('e.target.files.name', e.target.files[0].name)
    this.setState({
      image: e.target.files[0],
      filename: e.target.files[0].name,
      user_id: localStorage.id
    }, () => console.log(this.state))
    // this.setState({
    //   image: this.uploadInput.files[0]
    // }, () => console.log('image after setting state',this.state.image))
  }

  render() {
    return (
      <div className="form">
        <h3>Upload Photo</h3>
        <Form onSubmit={this.handleUploadImage} horizontal>
          <FieldGroup
            id="formControlsFile"
            type="file"
            label="Upload a Profile Photo"
            onChange={this.seeImage}
            ref={(ref) => { this.uploadInput = ref; }}>
          </FieldGroup>
          {this.state.image !== '' ? <Fragment><Button type="button" onClick={this.handleUploadImage}>Upload</Button></Fragment> : null}
        </Form>
      </div>
    );
  }
}

  function FieldGroup({ id, label, ...props }) {
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
      </FormGroup>
    );
  }


export default ImageUploader;


//the old return statement inside render
// return (
//   <div className="image-uploader-container">
//     <form onSubmit={this.handleUploadImage}>
//       <div>
//         <input onChange={this.seeImage} ref={(ref) => { this.uploadInput = ref; }} type="file" />
//       </div>
//       <br />
//       <div>
//         {this.state.image !== '' ? <button>Upload</button> : null }
//       </div>
//     </form>
// </div>
// );
