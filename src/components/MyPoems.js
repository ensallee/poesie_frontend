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
          <Carousel>
            {poemComponents.reverse()}
          </Carousel>
          </div>
      </Fragment>
    )
  }
}


// {poemComponents}
// <Carousel.Item>
//   <img width={900} height={500} alt="900x500" src="https://images.unsplash.com/photo-1532265095586-2214de652e25?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=7306e2c16748194eb04b150278f2b4e7&auto=format&fit=crop&w=1051&q=80" />
// </Carousel.Item>
// <Carousel.Item>
//   <img width={900} height={500} alt="900x500" src="https://images.unsplash.com/photo-1532248607602-8cf95e01d3f7?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=8483df99df717bb09cd746551ca81872&auto=format&fit=crop&w=1050&q=80" />
// </Carousel.Item>
// <Carousel.Item>
//   <img width={900} height={500} alt="900x500" src="https://images.unsplash.com/photo-1532196164534-ae5912fea015?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ecc5d48c07aa697020ac59ff22775266&auto=format&fit=crop&w=1050&q=80" />
// </Carousel.Item>

export default MyPoems;
