import React, { Component } from 'react';
import './App.css';
// import {Link} from 'react-router-dom';
import Moment from 'react-moment';
import ReactModal from 'react-modal';

class App extends Component {

  constructor () {
    super();
    this.state = {
      receipts: [],
    }
  }

  componentDidMount() {
   let token = localStorage.getItem('jwtToken')
   console.log(token)
    console.log(token, "3")
    fetch('http://10.30.32.255:8080/users/receipts', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
    .then(res => res.json())
    .then(receipts => this.setState({ receipts }));
  }

  total(receiptsArr){
    var sum = 0;
    receiptsArr.forEach(function(value){
      sum += value.total
    })
    return sum;
  }

render() {
   return (
      <div className ="flex-element">
        <div className= "title">
          <h1 className = "app-name"> <i className="fas fa-receipt"></i> Paperless</h1>
          <h4 className = "user-info"> Hi, User </h4>
        </div>
        <nav className="drawer mdc-drawer mdc-drawer--permanent">
          <div className="mdc-drawer__toolbar-spacer">
            <h4> Projects </h4>
          </div>
          <div className="mdc-drawer__content">
            <nav className="mdc-list">
              <a className="mdc-list-item"> All </a>
              <a className="mdc-list-item"> Lighthouse </a>
              <a className="mdc-list-item"> Buisness Trip </a>
            </nav>
          </div>
        </nav>
        <div className="App">
          <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list">
          { this.state.receipts.map(receipt => <Receipt { ...receipt }/> )}
          </ul>
          <div className="total">Total: ${parseFloat(this.total(this.state.receipts)/100).toFixed(2)}
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
      categories: []
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
        return <i className="fas fa-check-circle mdc-list-item__graphic green"></i>
      } else if (status === 2) {
        return <i className="fas fa-ellipsis-h mdc-list-item__graphic orange"></i>
      } else if (status === 3) {
        return <i className="fas fa-exclamation-triangle mdc-list-item__graphic red"></i>
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