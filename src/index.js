import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Login from './Login';

import {BrowserRouter, Route} from 'react-router-dom'

ReactDOM.render(
    <BrowserRouter>
    <div>
    <Route  path='/users' component = {App}/>
    <Route exact path='/' component = {Login}/>
    </div>
    </BrowserRouter>
   , document.getElementById('root'));

