export const GET_WORDS = "GET_WORDS";
export const UPDATE_NOUNS = "UPDATE_NOUNS"
export const UPDATE_VERBS = "UPDATE_VERBS"
export const UPDATE_ADJECTIVES = "UPDATE_ADJECTIVES"
export const UPDATE_PREPOSITIONS = "UPDATE_PREPOSITIONS"
export const UPDATE_ADVERBS = "UPDATE_ADVERBS"
export const UPDATE_OTHERS = "UPDATE_OTHERS"
export const SET_USER = "SET_USER"
export const SET_ALL_USERS = "SET_ALL_USERS"

export function getWords(){
  return ({type: GET_WORDS});
}

export function setAllUsers(users) {
  return {
    type: SET_ALL_USERS,
    payload: users
  }
}

export function setUser(user) {
  // console.log('userId inside setUser action', user)
  return {
    type: SET_USER,
    payload: user
  }
}

export function updateNouns(nouns) {
  return {
    type: UPDATE_NOUNS,
    payload: nouns
  }
}

export function updateVerbs(verbs) {
  return {
    type: UPDATE_VERBS,
    payload: verbs
  }
}

export function updateAdjectives(adjectives) {
  return {
    type: UPDATE_ADJECTIVES,
    payload: adjectives
  }
}

export function updatePrepositions(prepositions) {
  return {
    type: UPDATE_PREPOSITIONS,
    payload: prepositions
  }
}

export function updateAdverbs(adverbs) {
  return {
    type: UPDATE_ADVERBS,
    payload: adverbs
  }
}

export function updateOthers(others) {
  return {
    type: UPDATE_OTHERS
  }
}
