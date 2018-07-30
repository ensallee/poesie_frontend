import React, { Component } from 'react';

class ImageUploader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      image: '',
    };

    this.handleUploadImage = this.handleUploadImage.bind(this);
  }

  handleUploadImage(ev) {
    ev.preventDefault();
    let id = this.props.location.pathname.split('/')[2]

    const data = new FormData();
    console.log('uploadInput file', this.uploadInput.files[0])
    data.append('image', this.uploadInput.files[0]);
    data.append('filename', this.uploadInput.files[0].name)
    data.append('user_id', localStorage.id)

    fetch('http://localhost:4000/images', {
      method: 'POST',
      body: data,
    })
    .then(resp => resp.json())
    .then(this.props.history.push(`/users/${id}/poems`))
  };

  seeImage = () => {
    console.log('inside see image')
    this.setState({
      image: this.uploadInput.files[0]
    }, () => console.log('image after setting state',this.state.image))
  }

  render() {
    return (
      <div className="image-uploader-container">
        <form onSubmit={this.handleUploadImage}>
          <div>
            <input onChange={this.seeImage} ref={(ref) => { this.uploadInput = ref; }} type="file" />
          </div>
          <br />
          <div>
            {this.state.image !== '' ? <button>Upload</button> : null }
          </div>
        </form>
    </div>
    );
  }
}

export default ImageUploader;
