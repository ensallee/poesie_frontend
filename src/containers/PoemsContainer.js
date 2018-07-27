import React, { Component, Fragment } from 'react';
import NavBar3 from '../components/NavBar3';
import { Carousel } from 'react-bootstrap';
import uuid from 'uuid';

class PoemsContainer extends Component {
  constructor(props) {
    super(props)

    this.state={
      poems: []
    }
  }

  componentDidMount() {
    this.getPoems()
  }

  getPoems() {
    let config = {
      method: "GET",
      headers: {"Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
      }
    }

    fetch('http://localhost:4000/poems', config)
    .then(resp => resp.json())
    .then(data => this.setState({
      poems: data
    }))
  }

  handleClick(userId) {
    console.log('userId inside handleClick', userId)
    this.props.history.push(`/users/${userId}/poems`)
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


  render() {
    //CAREFUL WITH THE LIKE BUTTON HERE! WHEN YOU CLICK ON IT, IT COUNTS AS A CLICK ON CAROUSEL ITEM! ALSO, THERE IS NO HANDLE LIKE FUNCTION SO IT BREAKS!
    let poemImages = this.state.poems.map(poem => {
      return (
        <Carousel.Item key={uuid()}>
          <img onClick={() => this.handleClick(poem.user.id)} width={900} height={500} alt="900x500" src={poem.url} />
          {this.props.location.pathname.split('/')[2] === localStorage.id ? <button className="delete-button" onClick={() => this.handleDelete(poem.id)}>Delete</button> : null}
          {poem.likes_count === 1 ? <button className="like-button" onClick={() => this.handleLike(poem.id, poem.likes_count)}>{poem.likes_count} Like</button> : <button className="like-button" onClick={() => this.handleLike(poem.id, poem.likes_count)}>{poem.likes_count} Likes</button>}
        </Carousel.Item>
      )
    })
    return (
      <Fragment>
        <NavBar3 />
        <h1>All Poems</h1>
        <p>Click on a poem to see the poet's profile page.</p>
        <div className="carousel-container">
          <Carousel>
           {poemImages.reverse()}
         </Carousel>
        </div>
      </Fragment>
    )
  }
}

export default PoemsContainer;
