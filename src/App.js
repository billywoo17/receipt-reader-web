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
    fetch('/receipts')
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
          <h1 className = "app-name"> <i class="fas fa-receipt"></i> Paperless</h1>
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
      isModalOpen: false
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
  }

  render() {
    const { id, date, location, description, total, image_url} = this.props;
    return (
      <li className="mdc-list-item mdc-ripple-upgraded" key = {id} onClick={ this.toggleModal }>
        <i className="fas fa-check-circle mdc-list-item__graphic green"></i>
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
          className="modal"
          isOpen={this.state.isModalOpen}
          contentLabel="Minimal Modal Example"
          >
          <button onClick={this.toggleModal}>Close Modal</button>
          <p>{id}</p>
          <img src={image_url} alt="demo"/>
        </ReactModal>
      </li>
    )
  }
}

export default App;