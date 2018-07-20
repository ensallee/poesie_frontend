import React, { Component, Fragment } from 'react';
import Word from './Word'
import Adapter from './Adapter'
import { connect } from 'react-redux'
// import getWords from '../actions'
import { Container, Button } from 'semantic-ui-react';
import { updateNouns, updateVerbs, updateAdjectives, updatePrepositions, updateAdverbs, updateOthers } from '../actions'
import uuid from 'uuid';

class WordList extends Component {

    handleClick = (event) => {
      Adapter.getNouns().then(json => {
        // console.log('nouns inside handleclick', json);
        this.props.updateNouns(json)
      })
      Adapter.getVerbs().then(json => {
        // console.log('verbs inside handleclick', json);
        this.props.updateVerbs(json)
      })
      Adapter.getAdjectives().then(json => {
        // console.log('adjectives inside handleclick', json);
        this.props.updateAdjectives(json)
      })
      Adapter.getPrepositions().then(json => {
        // console.log('prepositions inside handleclick', json);
        this.props.updatePrepositions(json)
      })
      Adapter.getAdverbs().then(json => {
        // console.log('adverbs inside handleclick', json);
        this.props.updateAdverbs(json)
      })
      this.props.updateOthers()
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
    console.log('refs inside wordList', this.refss)
    let nouns = this.props.nouns.map(nounObj => nounObj.word)
    let verbs = this.props.verbs.map(verbObj => verbObj.word)
    let adjectives = this.props.adjectives.map(adjObj => adjObj.word)
    let prepositions = this.props.prepositions.map(prepObj => prepObj.word)
    let adverbs = this.props.adverbs.map(adverbObj => adverbObj.word)
    let combinedWords = nouns.concat(adjectives).concat(verbs).concat(prepositions).concat(adverbs).concat(this.props.others)
    let shuffledWords = this.shuffle(combinedWords)
    let wordComponents = shuffledWords.map(word => {
      return <Word allWords={shuffledWords} key={uuid()} word={word} />
    })
    return (
        <div ref="area" id="word-list">
          <Button content='Get Words' onClick={this.handleClick} />
          <h1>Inside Word List</h1>
          {wordComponents}
        </div>
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
    others: state.others
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    updateNouns: (nouns) => dispatch(updateNouns(nouns)),
    updateVerbs: (verbs) => dispatch(updateVerbs(verbs)),
    updateAdjectives: (adjectives) => dispatch(updateAdjectives(adjectives)),
    updatePrepositions: (prepositions) => dispatch(updatePrepositions(prepositions)),
    updateAdverbs: (adverbs) => dispatch(updateAdverbs(adverbs)),
    updateOthers: () => dispatch(updateOthers())
  }
}



export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(WordList);
