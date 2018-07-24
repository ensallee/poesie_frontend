import React, { Component } from 'react';
import Draggable from 'react-draggable'

class Word extends Component {
  constructor(props) {
    super(props)

    this.state={
       activeDrags: 0,
       // sourceList: //this points to wordList in mike's code, not sure what to do here because there are so many keys in this.state.
       // destlist: [],
       //mike has a sourceArea and a destArea
       // controlledPosition: {
       //  x: 0, y: 0
      // }
    }
  }

  onStart(e) {
    e.preventDefault()
  }

  onStop(e:MouseEvent, data: Object, id) {
    // console.log('Event: ', e)
    // console.log('data: ', data)
  }

  handleDoubleClick(e) {
    // console.log('inside handleDoubleClick')
    // console.log('event target inside doubleclick', e.target)
    let el = e.target
    // console.log('el after I grabbed it', el)
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

export default Word

//bounds will fix my container issue, right? Why isn't what I have working?
//THINGS I DELETED FROM RENDER:
// defaultPosition={{x: 0, y: 0}}
// grid={[25, 25]}
