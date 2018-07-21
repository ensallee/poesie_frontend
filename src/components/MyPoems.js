import React, { Component } from 'react';
import Poem from './Poem';

class MyPoems extends Component {
  state = {
    poems: [],
  }

  componentDidMount() {
    this.getPoems();
  }

  getPoems = () => {
    fetch(
      `http://localhost:4000/my-poems`,
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
      }, () => console.log(this.state.poems));
    })
    .catch(err => {
      console.log('catch');
      this.setState({
        poems: [],
      });
    })
  }

  render() {
    let poemComponents = this.state.poems.map((poem) => {
      return <Poem url={poem.url} />
    })
    console.log('inside render')
    return (
      <div>
        <h2>My Poems</h2>
        {poemComponents}
      </div>
    )
  }
}

export default MyPoems;
