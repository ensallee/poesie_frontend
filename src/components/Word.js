import React, { Component } from 'react';
import Draggable from 'react-draggable'
import Adapter from './Adapter'

class Word extends Component {

  onStart(e) {
    e.preventDefault()
    //this creates weird behavior
    // let word = e.target
    // let randColor = Adapter.getRandomColor()
    // word.style.cssText= `border-color: ${randColor}; color: ${randColor};`
  }

  onStop(e:MouseEvent, data: Object, id) {
    e.preventDefault()
    //this creates weird behavior if you try to pick it back up after dropping it.
    // let word = e.target
    // word.style.color="black"
    // word.style.borderColor="black"
  }

  handleDoubleClick(e) {
    let el = e.target
    el.classList.add('hidden')
  }

  render() {
    return (
      <Draggable
        onStart={this.onStart}
        onDrag={this.handleDrag}
        onStop={this.onStop}>
        <div className="handle word" onDoubleClick={this.handleDoubleClick}>{this.props.word}</div>
      </Draggable>
    );
  }
}

export default Word;
