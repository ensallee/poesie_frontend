export const GET_WORDS = "GET_WORDS";
export const UPDATE_NOUNS = "UPDATE_NOUNS"
export const UPDATE_VERBS = "UPDATE_VERBS"
export const UPDATE_ADJECTIVES = "UPDATE_ADJECTIVES"

export function getWords(){
  return ({type: GET_WORDS});
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
