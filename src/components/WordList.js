import React, { Component, Fragment } from 'react';
import Word from './Word'
import Adapter from './Adapter'
import { connect } from 'react-redux'
// import getWords from '../actions'
// import { Button } from 'semantic-ui-react';
import { updateNouns, updateVerbs, updateAdjectives, updatePrepositions, updateAdverbs, updateOthers } from '../actions'
import uuid from 'uuid';
import html2canvas from 'html2canvas';

class WordList extends Component {

    fetchAllWords() {
      Adapter.getNouns().then(json => {
        this.props.updateNouns(json)
      })
      Adapter.getVerbs().then(json => {
        this.props.updateVerbs(json)
      })
      Adapter.getAdjectives().then(json => {
        this.props.updateAdjectives(json)
      })
      Adapter.getPrepositions().then(json => {
        this.props.updatePrepositions(json)
      })
      Adapter.getAdverbs().then(json => {
        this.props.updateAdverbs(json)
      })
      this.props.updateOthers()
    }

    componentDidMount() {
      this.fetchAllWords()
    }

    handleClick = (event) => {
      this.fetchAllWords()
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

  savePoem = (e) => {
    let wordListDiv = document.getElementById('word-list')
    html2canvas(wordListDiv).then((canvas) => {
      let src = canvas.toDataURL("image/png")
      this.postPoem(src)
    })
  }

  postPoem = (src) => {
    let body = {
      poem: {
        url: src
      }
    }

    let config = {
      method: 'POST',
      headers: {"Content-Type": "application/json",
                "Authorization": localStorage.getItem('token')
      },
      body: JSON.stringify(body)
    }

    fetch('http://localhost:4000/poems/', config)
    .then(resp => resp.json())
    .then(data => {
      this.props.history.push(`/users/${this.props.currentUser.id}/poems`)
      }
    )
  }

  render() {
    let nouns = this.props.nouns.map(nounObj => nounObj.word)
    let verbs = this.props.verbs.map(verbObj => verbObj.word)
    let adjectives = this.props.adjectives.map(adjObj => adjObj.word)
    let prepositions = this.props.prepositions.map(prepObj => prepObj.word)
    let adverbs = this.props.adverbs.map(adverbObj => adverbObj.word)
    let combinedWords = nouns.concat(adjectives).concat(verbs).concat(prepositions).concat(adverbs).concat(this.props.others)
    let shuffledWords = this.shuffle(combinedWords)
    let wordComponents = shuffledWords.map(word => {
      return <Word key={uuid()} word={word} />
    })
    return (
        <Fragment>
          <button className="main-button" onClick={this.handleClick}>Refresh Words</button>
          { Adapter.isLoggedIn() ? <button className="main-button" onClick={this.savePoem}>Save Poem</button> : null }
        <div ref="area" id="word-list">
          {wordComponents}
        </div>
        </Fragment>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    nouns: state.words.nouns,
    adjectives: state.words.adjectives,
    verbs: state.words.verbs,
    prepositions: state.words.prepositions,
    adverbs: state.words.adverbs,
    others: state.words.others,
    currentUser: state.currentUser.currentUser
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

export default connect(mapStateToProps, mapDispatchToProps)(WordList)
