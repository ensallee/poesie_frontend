import {SET_USER} from '../actions';

const initialState = {
  currentUser: {}
}

//this was my attempt before talking to Eelan
// export default function reducer(state = initialState, action) {
//     switch(action.type) {
//       case SET_USER:
//       console.log('action.payload', action.payload)
//       fetch(`http://localhost:4000/sessions/`, {
//         method: 'POST',
//         headers: {
//           "Content-Type": 'application/json'
//         },
//         body: JSON.stringify(action.payload)
//       })
//         .then(res => res.json())
//         .then(json => {
//           localStorage.setItem('token', json.token);
//           console.log('json after login', json);
//           // this.props.history.push("/write");
//           let currentUser = action.payload
//           return {...state, currentUser}
//         })
//       default:
//         return state;
//     }
// }

export default function reducer(state = initialState, action) {
    switch(action.type) {
      case SET_USER:
      console.log('action.payload inside user reducer', action.payload)
        let currentUser = action.payload
        return {...state, currentUser}
      default:
        return state;
    }
}
