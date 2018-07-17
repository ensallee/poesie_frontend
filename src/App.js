import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import WritingContainer from './containers/WritingContainer'
import './App.css';
import Home from './components/Home'
import NavBar from './components/NavBar'
import RegistrationForm from './components/RegistrationForm'
import LogInForm from './components/LogInForm'

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <Route exact path ="/" component={(props) => <Home {...props}/>} />
        <Route exact path="/write" component={(props) => <WritingContainer {...props}/>} />
        <Route exact path="/register" component={(props) => <RegistrationForm {...props} />} />
        <Route exact path="/login" component={(props) => <LogInForm {...props} />} />
      </div>
    );
  }
}

export default App;

// <div className="App">
//         <NavBar2 />
//         <h1 className="pageTitle">Gourmand</h1>
//         <div id="edamam-badge" data-color="white"></div>
//     <div className="body">
//         <br></br>
//           <Route exact path="/" component={(props) => <SearchContainer {...props}/>}/>
//           { Adapter.isLoggedIn() ?
//             <Fragment>
//               <Redirect to="/" />
//               <Route exact path="/my_recipes" component={(props) => <RecipeList {...props}/>} />
//               <Route exact path="/new_recipe" component={(props) => <NewRecipeForm {...props} />}/>
//             </Fragment>
//             :
//             <Fragment>
//               <Route exact path="/register" component={(props) => <Register {...props} />} />
//               <Route exact path="/login" component={(props) => <Login {...props} />} />
//             </Fragment>
//           }
//         </div>
//       </div>
