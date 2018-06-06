import React, { Component } from 'react';
import Moment from 'react-moment';
import ReactModal from 'react-modal';
import App from './App';
import Login from './Login';
import {BrowserRouter, Route} from 'react-router-dom'
class Maincontainer extends Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }
    render() {
      return (  
        <BrowserRouter>
        <div>
        <Route  path='/users' component = {App}/>
        <Route exact path='/' component = {Login}/>
        </div>
        </BrowserRouter>)
    }
  }
  export default Maincontainer;


