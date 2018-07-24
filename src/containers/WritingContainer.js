import React, { Component } from 'react';
import WordList from '../components/WordList';
// import WritingArea from '../components/WritingArea';
// import { Grid } from 'semantic-ui-react';
import NavBar from '../components/NavBar'
import Adapter from '../components/Adapter'

class WritingContainer extends Component {

  //this will need a state of sourceArea and destArea, pointing to the values in console.log below.


  componentDidMount() {
    // console.log(this.dest, this.source);
    // console.log(this.refs.source.getBoundingClientRect())
    //I commented out the below two lines because I was attempting the single div with canvas approach
    // console.log(this.source.refs.area.getBoundingClientRect())
    // console.log(this.dest.refs.area.getBoundingClientRect())

    // this.setState({
    //   sourceArea: this.refs.source.getBoundingClientRect()
    // })
    // console.log('props inside writing container', this.props)
  }


  //I commented these out on Sat July 21 when beginning the canvas approach and wanted to get rid of divs.
  // <WritingArea ref={ref => this.dest = ref}/>
  //<WordList ref={connectedComponent => this.source = connectedComponent.getWrappedInstance()} />

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <h1 className="title">Poesie</h1>
        <div className="writing-container">
          <WordList history={this.props.history} />
        </div>
      </React.Fragment>
    )
  }
}

export default WritingContainer;
