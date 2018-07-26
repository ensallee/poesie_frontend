import {SET_USER, SET_ALL_USERS} from '../actions';

//I think the reason I'm no longer able to see the profile page after making a change to atom is that currentUser gets set back to an empty object each time.
const initialState = {
  currentUser: {},
  loading: true,
  users: []
}

export default function reducer(state = initialState, action) {
    switch(action.type) {
      case SET_USER:
        let currentUser = action.payload
        return {...state, currentUser, loading: false}
      case SET_ALL_USERS:
        let users = action.payload
        return {...state, users}
      default:
        return state;
    }
}
