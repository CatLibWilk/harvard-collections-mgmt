import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Landing from "./pages/Landing";
import Home from "./pages/Home";
import API from "./utils/API";
import './App.css';

class App extends Component {
  constructor (props) {
    super(props);

  }

  componentDidMount(){
    
  }

  render() {
    return (
      <div className="App">
        <Router>
          <Switch>
            <Route exact path = "/" component={Landing} /> 
            <Route exact path = "/home" component={Home} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default App;
