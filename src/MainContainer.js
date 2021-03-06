import React, { Component } from 'react';
import Moment from 'react-moment';
import ReactModal from 'react-modal';
import App from './App';
import Login from './Login';
import {BrowserRouter, Route} from 'react-router-dom';

class MainContainer extends Component {

 constructor(props) {
   super(props);
   this.state = {
     admin: "",
     user_id: ""
   };
   this.userCb = this.userCb.bind(this);
 }

 userCb(userData){
   this.setState({
     admin:userData.admin, 
     user_id: userData.user_id,
     first_name: userData.first_name,
     last_name: userData.last_name
    });

 }
   render() {

     return (
       <BrowserRouter>
       <div>
         <Route
         exact path='/'
         render={(props) => <Login {...props} extra={this.userCb} />} />
         <Route
         exact path='/user'
         render={(props) => <App {...props} extra={this.state.admin} user_id={this.state.user_id}  
         first_name={this.state.first_name} last_name={this.state.last_name}  />} />
       </div>
       </BrowserRouter>)
   }
 }

export default MainContainer;


