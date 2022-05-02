import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import LogIn from "./container/login";
import SignUp from "./container/signup";
import Home from './container/home';
import NavigationBar from './components/navbar';
import User from './container/user'
import Feed from './container/customizedfeed';

function App() {
  return (
  <div className ="App">
  <Router>
      <NavigationBar/>
          <Switch>
            <Route exact path = "/" component = {Home} />
            <Route path="/sign-in" component={LogIn} />
            <Route path="/sign-up" component={SignUp} />
            <Route path="/user" component={User} />
            <Route path="/feed" component={Feed} />
          </Switch>
    </Router>
  </div>
  );
}

export default App;