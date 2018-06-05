import React, { Component } from 'react';
import './App.css';
// import {Link} from 'react-router-dom';
import Moment from 'react-moment';

class App extends Component {
  state = {receipts: []}

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
      <h1 className = "app-name"> <i class="fas fa-receipt"></i> Your Receipts </h1>
      </div>
<nav class="drawer mdc-drawer mdc-drawer--permanent">
  <div class="mdc-drawer__toolbar-spacer">
  <h4> Projects </h4>
  </div>
  <div class="mdc-drawer__content">
    <nav class="mdc-list">
      <a class="mdc-list-item"> Inbox </a>
      <a class="mdc-list-item"> Star </a>
    </nav>
  </div>
</nav>
      <div className="App">
      <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list">
        {this.state.receipts.map(receipt =>
          <li className="mdc-list-item mdc-ripple-upgraded">
            <i className="fas fa-check-circle mdc-list-item__graphic green"></i>
            <span className="mdc-list-item__text" >
                <Moment format="DD/MM/YYYY">{receipt.date}</Moment>
                <span className="mdc-list-item__secondary-text">
                  {receipt.location} - {receipt.description}
                </span>
              </span>
            <span className="mdc-list-item__meta">
            ${parseFloat(receipt.total/100).toFixed(2)}
            </span>
          </li>
        )}
        </ul>
        <div className="total">Total: ${parseFloat(this.total(this.state.receipts)/100).toFixed(2)}
        </div>
      </div>
      </div>
    );
  }
}

export default App;