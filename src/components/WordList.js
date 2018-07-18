import React, { Component, Fragment } from 'react';
import Word from './Word'
import { connect } from 'react-redux'
import getWords from '../actions'

class WordList extends Component {

   shuffle = (array) => {
    var j, x, i;
    for (i = array.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1));
        x = array[i];
        array[i] = array[j];
        array[j] = x;
    }
    return array;
}

  render() {
    let combinedWords = this.props.nouns.concat(this.props.adjectives).concat(this.props.verbs).concat(this.props.prepositions).concat(this.props.articles).concat(this.props.adverbs)
    console.log('combined', combinedWords)
    let shuffledWords = this.shuffle(combinedWords)
    console.log('shuffled', shuffledWords)
    let wordComponents = shuffledWords.map(word => {
      return <Word word={word} />
    })
    return (
      <Fragment>
        <div id="word-list">
          <button onClick={this.props.getWords}>Get Words</button>
          <h1>Inside Word List</h1>
          {wordComponents}
        </div>
      </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nouns: state.nouns,
    adjectives: state.adjectives,
    verbs: state.verbs,
    prepositions: state.prepositions,
    adverbs: state.adverbs,
    // articles: state.articles
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    getWords: () => dispatch(getWords())
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(WordList);
