import React, { Component } from 'react';
import './App.css';
// import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import ReactModal from 'react-modal';
  class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      receipts: [],
      userName: "",
      projects: [],
      selectedProject:"",
      selectedReceipts:[],
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
      this.setState({ receipts })
      this.setState({userName: receipts[0].cat_name})
      this.setState({projects: receipts.map(x => x.project_name)})

      let projectObj = {}
      let projectArr = []
      this.state.projects.forEach(function(project){
        projectObj[project] = project
      })
      for(let key in projectObj){
        projectArr.push(key)
      }
      this.setState({projects: projectArr})
      this.setState({selectedReceipts: this.state.receipts})

      });
   }


  total(receiptsArr){
    var sum = 0;
    receiptsArr.forEach(function(value){
      sum += value.total
    })
    return sum;
  }


  logout(){
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

render() {
    // let project_list = this.state.receipts.map(receipt => receipt.project_name)
    // console.log(project_list)
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

class Receipt extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })

  }

  render() {

    function statusCheck (status) {
      if (status === 1) {
        return <i className="fas fa-check-circle mdc-list-item__graphic text-success"></i>
      } else if (status === 2) {
        return <i className="fas fa-ellipsis-h mdc-list-item__graphic orange text-warning"></i>
      } else if (status === 3) {
        return <i className="fas fa-exclamation-triangle mdc-list-item__graphic text-danger"></i>
      }
    };

    const { id, date, location, description, total, image_url, status_id} = this.props;

    return (
      <li className="mdc-list-item mdc-ripple-surface" key = {id} onClick={ this.toggleModal }>
        {statusCheck(status_id)}
        <span className="mdc-list-item__text" >
          <Moment format="DD/MM/YYYY">{date}</Moment>
            <span className="mdc-list-item__secondary-text">
              {location} - {description}
            </span>
          </span>
        <span className="mdc-list-item__meta">
          ${parseFloat(total/100).toFixed(2)}
        </span>
         <ReactModal
          className="modal flex-element"
          isOpen={this.state.isModalOpen}
          contentLabel="Modal"
          >
          <div className="modal-list">
            <h2 className="list-align">Details</h2>
            <ul className="mdc-list">
              <li className="mdc-list-item">Purchased date: <Moment format="DD/MM/YYYY">{date}</Moment></li>
              <li className="mdc-list-item">Location: {location}</li>
              <li className="mdc-list-item">Description: {description}</li>
              <li className="mdc-list-item">Amount: ${parseFloat(total/100).toFixed(2)}</li>
              <li className="mdc-list-item">Status: {status_id}</li>
            </ul>
            <button className="mdc-button mdc-button--raised list-align" onClick={this.toggleModal}>Close</button>
          </div>
          <div className="modal-pic">
            <img src={image_url} alt="demo"/>
          </div>
        </ReactModal>
      </li>
    )
  }
}

export default App;