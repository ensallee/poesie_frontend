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
              <WordList />
            </Grid.Column>
            <Grid.Column>
              <WritingArea/>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </React.Fragment>
    )
  }
}

export default WritingContainer;
