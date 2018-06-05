import React, { Component } from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Redirect} from 'react-router-dom'



class Login extends Component {
  constructor(props){
    super(props)
    this.submitForm = this.submitForm.bind(this);

    this.state = {
      email: "",
      password: "",
    }
  }

  submitForm() {
    fetch('http://10.30.31.122:8080/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: this.state.email,
        password: this.state.password,
      }),
    })
    .then((response) => {
      console.log(response)
      localStorage.setItem('jwtToken', response)
      console.log('item stored')
    })
  }


  render() {

// const ProtectedComponent = () => {
//  if (authFails)
//     return <Redirect to='/users'  />
// }


    return (
      <section className="hello">
        <div className="loginMain">


          <div className="loginHeader">
            <i className="fas fa-receipt"></i>
            Paperless
          </div>


          <input placeholder="Email" type="text" id="text-field-" onChange={(input)=> this.setState({username: input})} className="email mdc-text-field__input"/>

          <input placeholder="Password" type="password" id="text-field-" onChange={(input)=> this.setState({password: input})} className="password mdc-text-field__input"/>


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