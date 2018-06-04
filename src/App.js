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
      <div>
      <div className= "title">
        <h1> Receipts </h1>
      </div>
      <div className="App">
        {this.state.receipts.map(receipt =>
          <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list">
            <li className="mdc-list-item">
            <i className="fas fa-check-circle mdc-list-item__graphic green"></i>
              <span className="mdc-list-item__text">
              ${parseFloat(receipt.total/100).toFixed(2)}
                <span className="mdc-list-item__secondary-text">
                <Moment format="DD/MM/YYYY">{receipt.date}</Moment> - {receipt.location}
                </span>
              </span>
              <i className="fas fa-info-circle mdc-list-item__meta"></i>
              </li>
          </ul>
        )}
        <div className="total">Total: ${parseFloat(this.total(this.state.receipts)/100).toFixed(2)}
        </div>
      </div>
      </div>
    );
  }
}

export default App;