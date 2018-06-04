import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
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
      <div className="App">
        <h1>Receipts</h1>
        <Link to={`/`}>Login</Link>
        <div>
          Project
          Full Name
          Created Date
          location
          Total
          Status
          Description
          </div>
        {this.state.receipts.map(receipt =>
          <ul class="mdc-list mdc-list--two-line">
            <li class="mdc-list-item">
              <span class="mdc-list-item__text">
              ${parseFloat(receipt.total/100).toFixed(2)}
                <span class="mdc-list-item__secondary-text">
                <Moment format="DD/MM/YYYY">{receipt.date}</Moment> / {receipt.location}
                </span>
              </span>
            </li>
          </ul>
        )}
        Total: ${parseFloat(this.total(this.state.receipts)/100).toFixed(2)}
      </div>

    );
  }
}

export default App;