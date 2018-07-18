import env from '../env'

class Adapter {
  static getNouns = () => {
    return fetch(`https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=noun&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=12&limit=15&api_key=${env.app_key}`)
    .then(resp=> resp.json())
  }

  static getVerbs = () => {
    return fetch(`https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=verb&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=12&limit=10&api_key=${env.app_key}`)
    .then(resp=> resp.json())
  }

  static getAdjectives = () => {
    return fetch(`https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=adjective&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=12&limit=8&api_key=${env.app_key}`)
    .then(resp=> resp.json())
  }

//there's something wrong with this one.
  // static getArticles = () => {
  //   return fetch(`https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=article&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=12&limit=5&api_key=${env.app_key}`)
  //   .then(resp=> resp.json())
  // }

  static getPrepositions = () => {
    return fetch(`https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=preposition&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=12&limit=5&api_key=${env.app_key}`)
    .then(resp=> resp.json())
  }

  static getAdverbs = () => {
    return fetch(`https://api.wordnik.com/v4/words.json/randomWords?hasDictionaryDef=true&includePartOfSpeech=adverb&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=1&maxLength=12&limit=5&api_key=${env.app_key}`)
    .then(resp=> resp.json())
  }

  static isLoggedIn() {
    return !!localStorage.getItem('token');
  }

  static logout() {
    localStorage.removeItem('token');
  }
}

export default Adapter;
