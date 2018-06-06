import React, { Component } from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
// import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Redirect} from 'react-router-dom'



class Login extends Component {
  constructor(props){
    super(props)
    this.submitForm = this.submitForm.bind(this);
    this.email_input = this.email_input.bind(this);
    this.password_input = this.password_input.bind(this);

    this.state = {
      email: "",
      password: ""
    }
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
    console.log('abody', aBody);
    fetch('http://10.30.32.255:8080/user/login', {
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
                  localStorage.setItem('jwtToken', value.token)
                  this.props.history.push('/users')
                  let newToken = localStorage.getItem('jwtToken')
                })
      } else {
        alert("Invalid Login");
      }
    })
    .catch((err) =>{
      alert("Can't connect to the server", err)

    })
  }


  render() {

    return (
      <section className="hello">
         <div className="loginMain">
            <div className="loginHeader">
               <i className="fas fa-receipt"></i>
               Paperless
            </div>
            <input placeholder="Email" type="text" onChange={this.email_input} className="email mdc-text-field__input"/>
            <input placeholder="Password" type="password" onChange={this.password_input} className="password mdc-text-field__input"/>
            <div className="loginButton">
               <button type="button" className="btn btn-lg signInButton" onClick={this.submitForm}>Sign In</button>
               <button type="button" className="btn btn-outline-light btn-lg" onClick={this.submitForm}>Sign In</button>
            </div>
         </div>
         <section className="slide-in-bottom">
         </section>
      </section>
    )
  }
}

export default Login;