import React, { Component } from 'react';
import WordList from '../components/WordList';
import WritingArea from '../components/WritingArea';
import { Grid } from 'semantic-ui-react';
import NavBar from '../components/NavBar'

class WritingContainer extends Component {

  render() {
    return (
      <React.Fragment>
        <NavBar />
        <h1>Poesie</h1>
        <Grid divided='vertically'>
          <Grid.Row columns={2}>
            <Grid.Column >
              <div>
              <WordList />
              </div>
            </Grid.Column>
            <Grid.Column>
              <div>
              <WritingArea/>
              </div>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }

}




export default WritingContainer;
