import React, { Component } from 'react';
import './App.css';
// import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import ReactModal from 'react-modal';
import Receipt from './Receipt.js';

  class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      receipts: [],
      userName: "",
      projects: [],
      selectedProject:"",
      selectedReceipts:[],
      admin:false,
    }
  }

  componentDidMount() {
    let token = localStorage.getItem('jwtToken');
    fetch('http://10.30.31.122:8080/user/receipts', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(receipts => {
        this.setState({
          receipts
        })
        this.setState({
          userName: receipts[0].cat_name
        })
        this.setState({
          projects: receipts.map(x => x.project_name)
        })

        let projectObj = {}
        let projectArr = []
        this.state.projects.forEach(function (project) {
          projectObj[project] = project
        })
        for (let key in projectObj) {
          projectArr.push(key)
        }
        this.setState({
          projects: projectArr
        })
        this.setState({
          selectedReceipts: this.state.receipts
        })
        this.setState({admin:this.props.extra})
      });
  }
  total(receiptsArr) {
    var sum = 0;
    receiptsArr.forEach(function (value) {
      sum += value.total
    })
    return sum;
  }
  logout() {
    localStorage.removeItem("jwtToken")
    window.history.back();
  }

  selectedProject(project){
    let selectedReceiptstArr = []
    this.setState({selectedProject: project})
    this.state.receipts.forEach(function(receipt){
      if(receipt.project_name === project){
        selectedReceiptstArr.push(receipt)
      }      
    })
    this.setState({selectedReceipts: selectedReceiptstArr})
    console.log(this.state.selectedReceipts)
  }

  checkingAdmin(adminStatus){
    this.setState({admin: adminStatus})
  }

render() {
   return (
      <div className ="flex-element">
        <div className= "title">
          <h1 className = "app-name"> <i className="fas fa-receipt"></i> Paperless</h1>
          <div className = "right-title-bar">
            <h4 className = "user-info"> Hello, {this.state.userName} </h4>
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
            {this.state.projects.map((projects) => 
              (<a className="mdc-list-item" onClick={() => this.selectedProject(projects)} value={projects}> {projects} </a>)
            )}
          </nav>
        </div>
      </nav>    
        <div className="App">
          <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list">
          { this.state.selectedReceipts.map(receipt => <Receipt { ...receipt }/> )}
          </ul>
          <div className="total">Total: ${parseFloat(this.total(this.state.selectedReceipts)/100).toFixed(2)}
          </div>
        </div>
      </div>
    );
  }
}

export default App;