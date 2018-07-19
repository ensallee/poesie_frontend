import React, { Component, Fragment } from 'react';
import Word from './Word'
import Adapter from './Adapter'
import { connect } from 'react-redux'
// import getWords from '../actions'
import { Container, Button } from 'semantic-ui-react';
import { updateNouns, updateVerbs } from '../actions'

class WordList extends Component {

    handleClick = (event) => {
      Adapter.getNouns().then(json => {
        console.log('nouns inside handleclick', json);
        this.props.updateNouns(json)
      })
      Adapter.getVerbs().then(json => {
        console.log('verbs inside handleclick', json);
        this.props.updateVerbs(json)
      })
    }

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
    let nouns = this.props.nouns.map(nounObj => nounObj.word)
    let verbs = this.props.verbs.map(verbObj => verbObj.word)
    let combinedWords = nouns.concat(this.props.adjectives).concat(verbs).concat(this.props.prepositions).concat(this.props.articles).concat(this.props.adverbs).concat(this.props.conjunctions)
    console.log('combined', combinedWords)
    let shuffledWords = this.shuffle(combinedWords)
    console.log('shuffled', shuffledWords)
    let wordComponents = shuffledWords.map(word => {
      return <Word word={word} />
    })
    return (
      <Fragment>
        <Container id="word-list">
          <Button content='Get Words' onClick={this.handleClick} />
          <h1>Inside Word List</h1>
          {wordComponents}
        </Container>
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
    articles: state.articles,
    conjunctions: state.conjunctions
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNouns: (nouns) => dispatch(updateNouns(nouns)),
    updateVerbs: (verbs) => dispatch(updateVerbs(verbs))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(WordList);
