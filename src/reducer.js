import Adapter from './components/Adapter'

let initialState = {
  nouns: ["student", "table", "water", "music"],
  adjectives: ["hungry", "thirsty", "tired"],
  verbs: ["study", "work", "sleep", "eat"],
  prepositions: ["in", "behind", "ahead"],
  adverbs: ["slowly", "quickly"],
  articles: ["a", "the", "an"]
}

export default function reducer(state=initialState, action) {
  switch(action.type) {
    case 'GET_WORDS':
      Adapter.getNouns()
      // .then((data) => { return ...state, nouns: data})
      .then(data => console.log('nouns', data))

      Adapter.getVerbs()
      .then(data => console.log('verbs', data))

      Adapter.getAdjectives()
      .then(data => console.log('adjectives', data))

      Adapter.getPrepositions()
      .then(data => console.log('prepositions', data))

      Adapter.getAdverbs()
      .then(data => console.log('adverbs', data))

      Adapter.getArticles()
      .then(data => console.log('articles', data))
    default:
      return state;
  }
}
