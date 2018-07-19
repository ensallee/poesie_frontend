import React, { Component } from 'react';
import Draggable from 'react-draggable'

class Word extends Component {
  constructor(props) {
    super(props)

    this.state={
       activeDrags: 0,
       // controlledPosition: {
       //  x: 0, y: 0
      // }
    }
  }

  onStart(e) {
    e.preventDefault()
    // this.setState({activeDrags: ++this.state.activeDrags});
  }

  onStop() {
   // this.setState({activeDrags: --this.state.activeDrags});
  }

  // onControlledDrag(e, position) {
  //   e.preventDefault()
  //   const {x, y} = position;
  //   this.setState({controlledPosition: {x, y}});
  // }
  //
  // onControlledDragStop(e, position) {
  //   this.onControlledDrag(e, position);
  //   this.onStop();
  // }

  // onStart = (e) => {
  //   e.preventDefault()
  //   this.setState({activeDrags: this.state.activeDrags + 1})
  // }
  //
  // onStop = () => {
  //   this.setState({activeDrags: this.state.activeDrags - 1})
  // }
  //
  // handleDrag = (e,ui) => {
  //   e.preventDefault()
  //   e.stopPropagation()
  // }
  //
  // controlledStop = (e, position) => {
  //   const {x, y} = position;
  //   this.setState({controlledPosition: {x, y}})
  //   this.onStop()
  // }


  render() {
    return (
      <Draggable
        axis="both"
        handle=".handle"

        position={null}
        onStart={this.onStart}
        onDrag={this.handleDrag}
        onStop={this.onStop}>
        <div>
          <div className="handle word">{this.props.word}</div>
        </div>
      </Draggable>
    );
  }
}

export default Word

//bounds will fix my container issue, right? Why isn't what I have working?
//THINGS I DELETED FROM RENDER:
// defaultPosition={{x: 0, y: 0}}
// grid={[25, 25]}
