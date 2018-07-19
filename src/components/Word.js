import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';
import { ItemTypes } from './Constants';
import Draggable from 'react-draggable';

const wordSource = {
  beginDrag(props) {
    return {
      word: props.word
    };
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const propTypes = {
  word: PropTypes.string.isRequired,

  // Injected by React DnD:
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

class Word extends Component {
  render() {
    const { isDragging, connectDragSource, word } = this.props;
    return connectDragSource(
      <div style={{ opacity: isDragging ? 0.5 : 1 }}>
        {word}
      </div>
    );
  }
}

Word.propTypes = propTypes;

// Export the wrapped component:
export default DragSource(ItemTypes.WORD, wordSource, collect)(Word);
