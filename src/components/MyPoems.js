import React, { Component, Fragment } from 'react';
import Poem from './Poem';
import NavBar from './NavBar'
import ReactDOM from 'react-dom';
// import { Carousel } from 'react-responsive-carousel';
import { Carousel } from 'react-bootstrap';
import Profile from './Profile'

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

  handleDelete(id) {
    console.log('inside delete')
    console.log('id', id)
    let config = {
      method: "DELETE",
      headers: {"Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
      },
    }

    fetch(`http://localhost:4000/poems/${id}`, config)
    .then(resp => resp.json())
    .then(() => this.getPoems())
  }

  render() {
    let poemComponents = this.state.poems.map((poem) => {
      // return <Poem url={poem.url} />
      return (
        <Carousel.Item>
          <img width={900} height={500} alt="900x500" src={poem.url} />
            <Carousel.Caption>
              <button className="delete-button" onClick={() => this.handleDelete(poem.id)}>Delete</button>
            </Carousel.Caption>
        </Carousel.Item>
      )
    })
    console.log('inside render')
    return (
      <Fragment>
        <NavBar />
        <Profile />
          <div className="carousel-container">
          <h2>My Poems</h2>
          {this.state.poems.length !== 0 ? <Carousel>
            {poemComponents.reverse()}
          </Carousel> : <h4>You don't have any poems yet.</h4> }
          </div>
      </Fragment>
    )
  }
}

export default MyPoems;
