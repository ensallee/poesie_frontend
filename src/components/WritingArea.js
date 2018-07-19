import React, { Component, Fragment } from 'react';
import { Container } from 'semantic-ui-react';
import DropZone from './DropZone'

class WritingArea extends Component {

  render() {
    return (
      <Fragment>
        <Container id="writing-area">
          <h1>Inside Writing Area</h1>
          <DropZone />
        </Container>
      </Fragment>
    )
  }
}

export default WritingArea;
