import React, { Component } from 'react';
import './App.css';
import {Link} from 'react-router-dom';
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
          User
          Created Date
          location
          Total
          Status
          Approved By
          </div>

        {this.state.receipts.map(receipt =>
          <div> 
          {receipt.id}         
          {receipt.user}
          {receipt.created_at}
          {receipt.location}
          ${receipt.total}
          {receipt.status}
          {receipt.approve_by}
          </div>
        )}
        Total: ${this.total(this.state.receipts)}
      </div>

    );
  }
}

export default App;