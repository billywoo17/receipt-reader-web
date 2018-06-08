import React, { Component } from 'react';
import './App.css';
// import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import ReactModal from 'react-modal';
import Receipt from './Receipt.js';
import UserScreen from './screens/UserScreen';
require('dotenv').config()
class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      receipts: [],
      username: localStorage.getItem('name'),
      projects: [],
      selectedProject:"",
      selectedReceipts:[],
      isAdmin: false,
    };
  }

  // getUser(user_id) {
  //   const route = "http://10.30.31.122:8080/user/" + this.props.user_id;
  //   console.log(route);
  //   fetch(route, {
  //       method: 'GET',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         // 'Authorization': `Bearer ${token}`
  //       }
  //     })
  //     .then(res => res.json())
  //     .then(res => {
  //       console.log(res);
  //     })
  // }

  componentWillMount() {

    let token = localStorage.getItem('jwtToken');
    let query = localStorage.getItem('isAdmin') ? "users" : "user"
    let route = `/${query}/receipts`

    fetch(route, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(results => {
        let receipts = results.receipts
        this.setState({
          receipts: results.receipts,
          isAdmin: results.isAdmin,
          projects: results.receipts.map(x => x.project_name)
        });

        let projectObj = {};
        let projectArr = [];

        this.state.projects.forEach(function (project) {
          projectObj[project] = project;
        });

        for (let key in projectObj) {
          projectArr.push(key);
        }

        this.setState({
          projects: projectArr,
          selectedReceipts: this.state.receipts,
          admin:this.props.extra
        });
      })
      .catch((error) =>{
        console.log(error)
      })
  }

  total(receiptsArr) {
    var sum = 0;
    receiptsArr.forEach(function (value) {
      sum += value.total;
    });
    return sum;
  }

  logout() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("name");
    window.history.back();
  }

  selectedProject(project){
    let selectedReceiptstArr = [];
    this.setState({selectedProject: project});
    this.state.receipts.forEach(function(receipt){
      if (receipt.project_name === project){
        selectedReceiptstArr.push(receipt);
      }
    });
    this.setState({selectedReceipts: selectedReceiptstArr});
    console.log(document.getElementById(project));
    document.getElementById(project).style.color = 'green';
    }


  render() {
    return (
      <div className ="flex-element">
        <div className= "title">
          <h1 className = "app-name"> <i className="fas fa-receipt"></i> Paperless</h1>
          <div className = "right-title-bar">
            <h4 className = "user-info"> Hello, {this.state.username}</h4>
            <button className="mdc-button mdc-button--raised logout-button" onClick={this.logout}>logout</button>
          </div>
        </div>
        <nav className="drawer mdc-drawer mdc-drawer--permanent">
          <div className="mdc-drawer__toolbar-spacer">
            <h4> Projects </h4>

          </div>
          <div className="mdc-drawer__content">
            <nav className="mdc-list">
              <a className="mdc-list-item" onClick= {() => this.setState({selectedReceipts: this.state.receipts})}> All </a>
              {this.state.projects.sort().map((projects) =>
                (<a id={projects} className="mdc-list-item" onClick={() => this.selectedProject(projects)} value={projects} > {projects} </a>)
              )}
            </nav>
          </div>
        </nav>

        <UserScreen selectedReceipts={this.state.selectedReceipts} isAdmin={this.state.isAdmin}/>

      </div>
    );
  }
}

export default App;