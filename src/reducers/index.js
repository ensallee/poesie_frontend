import { combineReducers } from 'redux';
import userReducer from './userReducer';
import wordReducer from './wordReducer';

export default combineReducers({
  currentUser: userReducer,
  words: wordReducer
})
