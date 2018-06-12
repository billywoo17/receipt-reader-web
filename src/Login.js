import React, { Component } from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Redirect, Router} from 'react-router-dom';
const dotenv = require('dotenv')


class Login extends Component {
  constructor(props){
    super(props);
    this.submitForm = this.submitForm.bind(this);
    this.email_input = this.email_input.bind(this);
    this.password_input = this.password_input.bind(this);

    this.state = {
      email: "",
      password: ""
    };
  }

  email_input(event) {
    this.setState({email: event.target.value});
  }
  password_input(event) {
    this.setState({password: event.target.value});
  }

  submitForm() {
    const aBody = JSON.stringify({
      email: this.state.email,
      password: this.state.password,
    });
    fetch('/user/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: aBody,
    })
    .then(response => {
      if (response.status === 200) {
        response.json()
                .then(value => {
                  localStorage.setItem('jwtToken', value.token);
                  let newToken = localStorage.getItem('jwtToken');
                  localStorage.setItem('isAdmin', value.admin);
                  localStorage.setItem('name', value.first_name);
                  console.log(value);
                  this.props.extra({
                    admin: value.admin,
                    user_id: value.id,
                    first_name: value.first_name,
                    last_name: value.last_name
                  });
                  this.props.history.push('/user');
                });
      } else {
        alert("Invalid Login");
      }
    })
    .catch((err) =>{
      alert("Can't connect to the server", err);

    });
  }


  render() {

    return (
      <div className="hello">
      <img id="loginBackground" src="http://cdn.purple.fr/8443516530e1413bfbacc89be51312d5/static.purple.fr/2015/06/L1049541-parc-820x550.jpg/820x550/L1049541-parc-820x550.jpg" />
         <div className="loginMain">
            <div className="loginHeader">
               <i className="fas fa-receipt"></i>
               Paperless
            </div>
            <input placeholder="Email" type="text" onChange={this.email_input} className="email mdc-text-field__input"/>
            <input placeholder="Password" type="password" onChange={this.password_input} className="password mdc-text-field__input"/>
            <div className="loginButton">
               <button type="button" className="btn btn-lg signInButton" onClick={this.submitForm}>Sign In</button>
            </div>
         </div>
      </div>
    )
  }
}

export default Login;