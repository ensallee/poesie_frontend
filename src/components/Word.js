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
    // this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop(e:MouseEvent, data: Object, id) {
    console.log('Event: ', e)
    console.log('data: ', data)
    //FROM MIKES INSTRUCTIONS:
    //find the word inside of state. he had this:
    //let movedWord = this.state.wordList.find(w => w.id === id)
    //then, remove it from both sourceList and destList inside state

    //then, do something like this:
    // const {left, right, top, bottom} = this.refs.source.getBoundingClientRect()
    //and do some math:
    // if (e.x > left && e.x < right && e.y > top && e.y < bottom) {
    // console.log('in sourcebox')
    //then, inside of sourcebox:
    //sourceList.push(movedWord) }
    // else {
      // destList.push(movedWord)
    // }

    //then set state with sourceList && destList
  }

  //Mike set up a componenetDidMount to set state for sourceArea & destArea, but that won't work when user resizes so maybe don't do that.


  // axis="both"
  // handle=".handle"
  //
  // position={null}

  // That column is because of how div in div styles in css
  // The unable to drag part, I'm not sure what happens there.
  // the preventdefault thing.
  // not that i can tell, maybe it's position={null}?



  render() {
    return (
      <Draggable
        onStart={this.onStart}
        onDrag={this.handleDrag}
        onStop={this.onStop}>
        <div className="handle word">{this.props.word}</div>
      </Draggable>
    );
  }
}

export default Word

//bounds will fix my container issue, right? Why isn't what I have working?
//THINGS I DELETED FROM RENDER:
// defaultPosition={{x: 0, y: 0}}
// grid={[25, 25]}
