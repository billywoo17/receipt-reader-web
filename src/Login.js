import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
class Login extends Component {

  render() {
    return (
      <div>MY Login page Hello friends!
        <Link to={'/users'}>Check my receipts</Link>
      
      </div>);
  }
}

export default Login;