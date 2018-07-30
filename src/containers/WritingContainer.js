import React, { Component } from 'react';
import WordList from '../components/WordList';
// import WritingArea from '../components/WritingArea';
// import { Grid } from 'semantic-ui-react';
// import Adapter from '../components/Adapter'
import NavBar3 from '../components/NavBar3'

class WritingContainer extends Component {

  render() {
    return (
      <React.Fragment>
        <NavBar3 />
        <br></br>
        <h1 className="title linear-wipe">Poesie</h1>
        <div className="writing-container">
          <WordList history={this.props.history} />
        </div>
      </React.Fragment>
    )
  }
}

export default WritingContainer;
