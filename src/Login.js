import React, { Component } from 'react';
import './Login.css';
import {Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';



class Login extends Component {

  render() {
    return (
      <div className="loginMain">

        <div className="loginHeader">
          <i className="fas fa-receipt"></i>
          Paperless
        </div>


        <input placeholder="Username" type="text" id="text-field-" className="username mdc-text-field__input"/>
        <input placeholder="Password" type="text" id="text-field-" className="password mdc-text-field__input"/>

        <div className="loginButton">
          <button type="button" class="btn btn-lg GreenSignIn">Sign In</button>

          <button type="button" className="btn btn-outline-light btn-lg">Sign In</button>
        </div>


      </div>
    )
  }
}

    // return <div className='Modal'>
    //           <Logo />
    //           <form onSubmit= { this.props.onSubmit }>
    //             <Input type='text' name='username' placeholder='username' />
    //             <Input type='password' name='password' placeholder='password' />
    //             <button> Sign In</button>
    //           </form>
    //           <div className='social-signin'>
    //             <button className="fb" onClick={ this.props.onClick }><i className="fa fa-facebook" aria-hidden="true"></i></button>
    //             <button className="tw" onClick={ this.props.onClick }><i className="fa fa-twitter" aria-hidden="true"></i></button>
    //           </div>
    //             <a href='#'>Lost your password ?</a>
    //        </div>





export default Login;