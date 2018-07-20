import React, { Component } from 'react';
import WordList from '../components/WordList';
import WritingArea from '../components/WritingArea';
import { Grid } from 'semantic-ui-react';
import NavBar from '../components/NavBar'

class WritingContainer extends Component {

  //this will need a state of sourceArea and destArea, pointing to the values in console.log below.


  componentDidMount() {
    console.log('this.dest and this.source', this.dest, this.source);
    // console.log(this.refs.source.getBoundingClientRect())
    console.log('this.source.refs', this.source.refs.area.getBoundingClientRect())
    console.log('this.source.dest', this.dest.refs.area.getBoundingClientRect())

    // this.setState({
    //   sourceArea: this.refs.source.getBoundingClientRect()
    // })
  }

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <h1>Poesie</h1>
        <div className="writing-container">
          <WordList ref={connectedComponent => this.source = connectedComponent.getWrappedInstance()} />
          <WritingArea ref={ref => this.dest = ref}/>
        </div>
      </React.Fragment>
    )
  }
}

export default WritingContainer;
