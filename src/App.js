import React, {
  Component
} from 'react';
import './App.css';
// import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import ReactModal from 'react-modal';
import Receipt from './Receipt.js';
import UserScreen from './screens/UserScreen';
import CreateProject from './component/CreateProject';
require('dotenv').config()

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receipts: [],
      username: localStorage.getItem('name'),
      projects: [],
      selectedProject: "",
      selectedReceipts: [],
      isAdmin: false,
      showProject: false,
    };
    this._toggleCreateProject = this._toggleCreateProject.bind(this);
    this._addNewProject = this._addNewProject.bind(this);
  }
  componentWillMount() {
    fetch('https://api.paperless.stream/projects', {
        method: 'GET',
        credentials: 'include',
        cache: 'no-cache',
        mode: 'cors',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      })
      .then(res => res.json())
      .then(results => {
        this.setState({
          projects: results.map(project => project.project_name)
        })
      })


    let token = localStorage.getItem('jwtToken');
    let query = localStorage.getItem('isAdmin') ? "users" : "user"
    let route = `https://api.paperless.stream/${query}/receipts`

    fetch(route, {
        method: 'GET',
        credentials: 'include',
        cache: 'no-cache',
        mode: 'cors',
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
        })
        if (!this.state.isAdmin) {
          this.setState({
            projects: results.receipts.map(receipt => receipt.project_name)
          })
        }

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
          admin: this.props.extra
        });
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentDidMount() {
    document.getElementById('project_all').style.backgroundColor = 'silver';
  }


  logout() {
    localStorage.removeItem("jwtToken");
    localStorage.removeItem("isAdmin");
    localStorage.removeItem("name");
    window.history.back();
  }


  //when the "All projects" section is clicked, set the receipt state to all receipts and highlight "All projects"
  allSectionClicked() {
    this.setState({
      selectedReceipts: this.state.receipts
    });
    const project_list = document.getElementsByClassName('projectListItem');
    [].forEach.call(project_list, function (project) {
      project.style.backgroundColor = 'white'
    });
    document.getElementById('project_all').style.backgroundColor = 'silver';
  }


  selectedProject(project) {
    let selectedReceiptstArr = [];
    this.setState({
      selectedProject: project
    });
    this.state.receipts.forEach(function (receipt) {
      if (receipt.project_name === project) {
        selectedReceiptstArr.push(receipt);
      }
    });
    this.setState({
      selectedReceipts: selectedReceiptstArr
    });
    //selected project list will have background highlighted on sidebar
    const project_list = document.getElementsByClassName('projectListItem');
    [].forEach.call(project_list, function (project) {
      project.style.backgroundColor = 'white'
    });
    document.getElementById(project).style.backgroundColor = 'silver';
  }

  _toggleCreateProject() {
    this.setState({
      showProject: !this.state.showProject
    })
  }

  _addNewProject(projectArray) {
    this.setState({
      projects: projectArray
    })
  }
  render() {

    return (
      <div className ="flex-element">
        <div className= "title">
          <h1 className = "product-name"> <i className="fas fa-receipt"></i> Paperless</h1>
          <div className = "right-title-bar">
            <h4 className = "user-info"> Hello, {this.state.username}</h4>
            <button className="btn btn-lg logout-button" onClick={this.logout}>Log Out</button>
          </div>
        </div>
        <nav className="drawer mdc-drawer mdc-drawer--permanent">
          <div className="mdc-drawer__toolbar-spacer" onClick={this._toggleCreateProject}>
            <h4>{this.state.isAdmin ? 'Create Projects' : 'Projects'} </h4>
          </div>
          {this.state.isAdmin ?
          (this.state.showProject ? <CreateProject _toggleCreateProject = {this._toggleCreateProject} addProject = {this._addNewProject} currentProject = {this.state.projects}/>: <a/>): <a/>}
          <div className="mdc-drawer__content">
            <nav className="mdc-list">
              <a id='project_all' className="mdc-list-item projectListItem" onClick= {() => this.allSectionClicked()}> All Projects </a>
              {this.state.projects.map((projects) =>
                (<a id={projects} className="mdc-list-item projectListItem" onClick={() => this.selectedProject(projects)} value={projects} > {projects} </a>)
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