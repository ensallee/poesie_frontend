import React from 'react';
import { Carousel } from 'react-bootstrap';

const Poem = (props) => {
  console.log('props inside Poem', props)
  return (
    <Carousel.Item>
      <img width={900} height={500} alt="900x500" src={props.url} />
    </Carousel.Item>
  )
}

export default Poem;
