import React, { Component, Fragment } from 'react';
import NavBar3 from './NavBar3'
// import ReactDOM from 'react-dom';
import { Carousel } from 'react-bootstrap';
import Profile from './Profile';
import { connect } from 'react-redux';
import OtherUserProfile from './OtherUserProfile';
import uuid from 'uuid';

class MyPoems extends Component {
  state = {
    poems: [],
  }

  componentDidMount() {
    this.getPoems();
  }

  getPoems = () => {
    let id = this.props.location.pathname.split('/')[2]
    console.log('id inside my poems', id)
    fetch(
      `http://localhost:4000/users/${id}/poems`,
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
    let config = {
      method: "DELETE",
      headers: {"Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
      }
    }

    fetch(`http://localhost:4000/poems/${id}`, config)
    .then(resp => resp.json())
    .then(() => this.getPoems())
  }

  handleLike(id, likesCount) {
    console.log('inside handleLike')
    console.log('id inside handleLike', id)
    let body = {
      poem_id: id
    }
    let config = {
      method: "POST",
      headers: {"Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')},
      body: JSON.stringify(body)
    }

    fetch('http://localhost:4000/likes', config)
    .then(resp => resp.json())
    .then(() => this.getPoems())
  }

  //in the below render method, I'm having to user localStorage.id to identify the current user instead of this.props.currentUser bc/ currentUser is coming back as an empty object, even after log in. I don't understand why this keeps happening.
  render() {
    let poemComponents = this.state.poems.map((poem) => {
      console.log('like count of poems', poem.likes_count)
      return (
        <Carousel.Item key={uuid()}>
          <img width={900} height={500} alt="900x500" src={poem.url} />
            {this.props.location.pathname.split('/')[2] === localStorage.id ? <button className="delete-button" onClick={() => this.handleDelete(poem.id)}>Delete</button> : null}
            {poem.likes_count === 1 ? <button className="like-button" onClick={() => this.handleLike(poem.id, poem.likes_count)}>{poem.likes_count} Like</button> : <button className="like-button" onClick={() => this.handleLike(poem.id, poem.likes_count)}>{poem.likes_count} Likes</button>}
        </Carousel.Item>
      )
    })
    return (
      <Fragment>
        <NavBar3 />
        <br></br>
        <br></br>
        {this.props.location.pathname.split('/')[2] === localStorage.id ? <Profile history={this.props.history} /> : <OtherUserProfile id={this.props.location.pathname.split('/')[2]} />}
          <div className="carousel-container">
          {this.state.poems.length !== 0 ? <Carousel>
            {poemComponents.reverse()}
          </Carousel> : <h4>No poems yet.</h4> }
          </div>
      </Fragment>
    )
  }
}

//this isn't doing anything for me becasue I had to use localstorage.id to get the current user instead of the store because it resets to an empty object on refresh.
const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser.currentUser,
  }
}


export default connect(mapStateToProps)(MyPoems);
