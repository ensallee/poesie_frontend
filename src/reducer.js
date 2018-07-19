import Adapter from './components/Adapter'
// import { GET_WORDS } from './actions'
import { UPDATE_NOUNS, UPDATE_VERBS } from './actions'

let initialState = {
  nouns: ["student", "table", "water", "music"],
  adjectives: ["hungry", "thirsty", "tired"],
  verbs: ["study", "work", "sleep", "eat"],
  prepositions: ["in", "behind", "ahead"],
  adverbs: ["slowly", "quickly"],
  articles: ["a", "the", "an"],
  conjunctions: ["and", "or", "but"]
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    // case GET_WORDS:
    //   Adapter.getNouns()
    //   // .then((data) => { return ...state, nouns: data})
    //   .then(data => console.log('nouns', data))
    //
    //   Adapter.getVerbs()
    //   .then(data => console.log('verbs', data))
    //
    //   Adapter.getAdjectives()
    //   .then(data => console.log('adjectives', data))
    //
    //   Adapter.getPrepositions()
    //   .then(data => console.log('prepositions', data))
    //
    //   Adapter.getAdverbs()
    //   .then(data => console.log('adverbs', data))
    //
    //   //NO MORE ARTICLES THEY ARE BAD
    //   // Adapter.getArticles()
    //   // .then(data => console.log('articles', data))
    case UPDATE_NOUNS:
      return {...state, nouns: action.payload};
    case UPDATE_VERBS:
      return {...state, verbs: action.payload}
    default:
      return state;
  }
}
