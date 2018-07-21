import React, { Component } from 'react';

const Poem = (props) => {
  console.log('props inside Poem', props)
  return (
    <img src={props.url} />
  )
}

export default Poem;
