import React, { Component, Fragment } from 'react';
import Word from './Word'
import Adapter from './Adapter'
import { connect } from 'react-redux'
// import getWords from '../actions'
import { Container, Button } from 'semantic-ui-react';
import { updateNouns, updateVerbs, updateAdjectives, updatePrepositions } from '../actions'

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
      Adapter.getAdjectives().then(json => {
        console.log('adjectives inside handleclick', json);
        this.props.updateAdjectives(json)
      })
      Adapter.getPrepositions().then(json => {
        console.log('prepositions inside handleclick', json);
        this.props.updatePrepositions(json)
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
    let adjectives = this.props.adjectives.map(adjObj => adjObj.word)
    let prepositions = this.props.prepositions.map(prepObj => prepObj.word)
    // console.log('adjectives inside of wordlist render', adjectives)
    let combinedWords = nouns.concat(adjectives).concat(verbs).concat(prepositions).concat(this.props.articles).concat(this.props.adverbs).concat(this.props.conjunctions)
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
    updateVerbs: (verbs) => dispatch(updateVerbs(verbs)),
    updateAdjectives: (adjectives) => dispatch(updateAdjectives(adjectives)),
    updatePrepositions: (preposition) => dispatch(updatePrepositions(preposition))
  }
}



export default connect(mapStateToProps, mapDispatchToProps)(WordList);
