//I had to use following and followers instead of users for following container and followers container b/c for some reason, the fetch for an individual user doesn't return who that particular user is following and followed by. It also doesn't reflect their images. So, once I get to the individual following and follower components, I do a fetch for that parcticular user so I can retrieve that information.

import React, { Component } from 'react';
import { Card, Icon } from 'semantic-ui-react'

class Following extends Component {
  constructor(props) {
    super(props)

    this.state = {
      followers : [],
      following: [],
      images: []
    }
  }

  handleClick = () =>  {
    this.props.history.push(`/users/${this.props.id}/poems`)
  }

  componentDidMount = () => {
    let config = {
      method: "GET",
      headers: {"Content-Type": "application/json",
          "Authorization": localStorage.getItem('token')
        }
    }

    fetch(`http://localhost:4000/users/${this.props.id}`, config)
    .then(resp => resp.json())
    .then(data => {
      this.setState({
        followers: data.followers,
        following: data.following,
        images: data.images
      }, () => console.log('state after fetch inside following', this.state))
    })
  }

  render() {
    let image = this.state.images[this.state.images.length - 1]
    let image_url;
    if (image !== undefined) {
      image_url = image.image.url
    }
    return (
      <Card className="user-card font">
        <Card.Content className="font" onClick={this.handleClick}>
          {image_url === undefined ? <img className="card-photo" src={require("../images/placeholder_avatar.png")}/> : <img className="card-photo" src={`${image_url}`} />}
          <Card.Header className="font">{this.props.name}</Card.Header>
          <Card.Meta>
            <span className='date font'>{this.props.hometown}</span>
          </Card.Meta>
          <Card.Description className="font">{this.props.bio}</Card.Description>
        </Card.Content>
        <Card.Content className="font" extra>
            <Icon name='user' />
            {this.state.followers.length} Followers | {this.state.following.length} Following
        </Card.Content>
      </Card>
    )
  }
}

export default Following;
