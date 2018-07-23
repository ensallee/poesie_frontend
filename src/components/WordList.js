import React, { Component, Fragment } from 'react';
import Word from './Word'
import Adapter from './Adapter'
import { connect } from 'react-redux'
// import getWords from '../actions'
import { Container, Button } from 'semantic-ui-react';
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

  convertURIToImageData(URI) {
    return new Promise(function(resolve, reject) {
      if (URI == null) return reject();
      var canvas = document.createElement('canvas'),
          context = canvas.getContext('2d'),
          image = new Image();
      image.addEventListener('load', function() {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0, canvas.width, canvas.height);
        resolve(context.getImageData(0, 0, canvas.width, canvas.height));
      }, false);
      image.src = URI;
    });
  }

  savePoem = (e) => {
    // console.log('this inside savePoem', this)
    // console.log('inside savePoem')
    let wordListDiv = document.getElementById('word-list')
    // console.log(wordListDiv)
    //the below works! It takes a screen shot of the div and appends it to the DOM. Now I need it to just convert the screen shot into an image, rather than saving it to the DOM.
    // html2canvas(wordListDiv).then(function(canvas) {
    // document.body.appendChild(canvas)})

    // html2canvas(wordListDiv).then((canvas) => {
    //   let image_data_url = (canvas).toDataURL();
    //   this.convertURIToImageData(image_data_url).then(function(imageData) {
    //     console.log('imageData', imageData);
    // });
    // })
    //the below successfully appends the image to the DOM! So, now I just need to save the src on the back end and then re-render inside an img tag on the front end.
    html2canvas(wordListDiv).then((canvas) => {
      var image = new Image()
      let src = canvas.toDataURL("image/png")
      // console.log(image)
      // document.body.appendChild(image)
      // return image;
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
      console.log(data);
      this.props.history.push("/my_poems")
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
          <Button content='Refresh Words' onClick={this.handleClick} />
          <Button content="Save Poem" onClick={this.savePoem}/>
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
    others: state.words.others
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


//this was the export I was using when I needed a ref
// export default connect(mapStateToProps, mapDispatchToProps, null, { withRef: true })(WordList);
export default connect(mapStateToProps, mapDispatchToProps)(WordList)
