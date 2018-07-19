import React, { Component } from 'react';
import Draggable from 'react-draggable'

class Word extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <Draggable
        axis="both"
        handle=".handle"
        defaultPosition={{x: 0, y: 0}}
        bounds='.WritingContainer'
        position={null}
        grid={[25, 25]}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>
        <div>
          <div className="handle word">{this.props.word}</div>
        </div>
      </Draggable>
    );
  }
}

export default Word

//bounds will fix my container issue, right? Why isn't what I have working?
