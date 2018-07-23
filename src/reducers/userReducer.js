import {SET_USER} from '../actions';

const initialState = {
  currentUser: null
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
      case SET_USER:
        let currentUser = [...state.currentUser, action.payload]
        return {...state, currentUser}
      default:
        return state;
    }
}
