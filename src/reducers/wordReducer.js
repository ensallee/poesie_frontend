import Adapter from '../components/Adapter'
// import { GET_WORDS } from './actions'
import { UPDATE_NOUNS, UPDATE_VERBS, UPDATE_ADJECTIVES, UPDATE_PREPOSITIONS, UPDATE_ADVERBS, UPDATE_OTHERS } from '../actions'

let initialState = {
  nouns: [],
  adjectives: [],
  verbs: [],
  prepositions: [],
  adverbs: [],
  others: []
}

let others = ["a", "the", "an", "and", "or", "but", "he", "she", "they", "it", "we", "his", "hers", "our", "are", "is", "were", "s", "es"]

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case UPDATE_NOUNS:
      return {...state, nouns: action.payload};
    case UPDATE_VERBS:
      return {...state, verbs: action.payload};
    case UPDATE_ADJECTIVES:
      return {...state, adjectives: action.payload};
    case UPDATE_PREPOSITIONS:
      return {...state, prepositions: action.payload}
    case UPDATE_ADVERBS:
      return {...state, adverbs: action.payload}
    case UPDATE_OTHERS:
      return {...state, others: others}
    default:
      return state;
  }
}
