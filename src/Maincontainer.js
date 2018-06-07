import React, { Component } from 'react';

import App from './App';
import Login from './Login';
import {BrowserRouter, Route} from 'react-router-dom'
class Maincontainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      admin:""
    }
    this.isAdmin = this.isAdmin.bind(this)
  }

  isAdmin(adminStatus){
    this.setState({admin:adminStatus})
  }
    render() {
      return (  
        <BrowserRouter>
        <div>
          <Route
          exact path='/'
          render={(props) => <Login {...props} extra={this.isAdmin} />} />
          <Route
          exact path='/users'
          render={(props) => <App {...props} extra={this.state.admin} />} />
        </div>
        </BrowserRouter>)
    }
  }
  export default Maincontainer;


