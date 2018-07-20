import React, { Component } from 'react';
import Draggable from 'react-draggable'
import ReactDOM from 'react-dom';

class Word extends Component {
  constructor(props) {
    super(props)

    this.state={
       sourceWords: this.props.allWords,
       selected: []
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

  onStop = (e:MouseEvent, data: Object, id) => {

    console.log('Event: ', e)
    console.log('data: ', data)
    // console.log('refs inside parent', this.parentNode.refs.source.getBoundingClientRect())
    var writingContainer = document.querySelector('.writing-container')
    let source = ReactDOM.findDOMNode(writingContainer.source.refs.area)
    debugger
    console.log('source', source)
    console.log('word', data.node.firstChild.data)
    if (this.state.selected.find(w => w.word === data.node.firstChild.data)) {
      console.log('inside the true block so word is here')
      let wordToChange = this.state.selected.find(w => w.word === data.node.firstChild.data)
        // let parent = document.getElementById('writing-area')
        // let elm = data.node
        let newX = data.x
        let newY = data.y
        console.log('new top and left', newX, newY)
        let adjustedWords = this.state.selected.map(w => {
          if (w.word === wordToChange) {
            return {...w, xCord: newX, yCord: newY}
          } else {
            return w
          }
        })
        console.log('adjustedWords', adjustedWords)

    } else {
      console.log('inside the false block so word isnt here')
      // let parent = document.getElementById('writing-area')
      // let elm = data.node
      // let childOffset = {
      // top: elm.offsetTop - parent.offsetTop,
      // left: elm.offsetLeft - parent.offsetLeft
      // }
      //the above doesn't work because offsetTop and offsetLeft aren't changing when you move the div.
      console.log('x', data.x)
      console.log('y', data.y)
      let newWord = {
        word: data.node.firstChild.data,
        xCord: data.x,
        yCord: data.y
      }
      let selectedWords = this.state.selected
      let newWords = [...selectedWords, newWord]
      this.setState({
        selected: newWords
      }, () => console.log('set state', this.state))
    }
    //NOTES ON MIKES INSTRUCTIONS:
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
