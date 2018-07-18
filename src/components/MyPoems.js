import React, { Component } from 'react';

class MyPoems extends Component {
  state = {
    poems: [],
  }

  componentDidMount() {
    this.getPoems();
  }

  getPoems = () => {
    fetch(
      `http://localhost:3000/my-poems`,
      {
        headers: {
          "Content-Type": "application/json",
          "Authorization": localStorage.getItem('token')
        }
      }
    )
    .then(res => {
      console.log(res);
      return res.json()
    })
    .then(json => {
      this.setState({
        poems: json,
      });
    })
    .catch(err => {
      console.log('catch');
      this.setState({
        poems: [],
      });
    })
  }

  render() {
    console.log('inside render')
    return (
      <div>
        <h2>My Poems</h2>
      </div>
    )
  }
}

export default MyPoems;
