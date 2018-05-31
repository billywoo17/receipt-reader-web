import React, { Component } from 'react';
import './App.css';

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
        <table align="center">
        <tbody>
        <tr>
          <th>User</th>
          <th>Created Date</th>
          <th>location</th>
          <th>Total</th>
          <th>Status</th>
          <th>Approved By</th>
        </tr>
        {this.state.receipts.map(receipt =>
          <tr key={receipt.id}>
          <td>{receipt.user}</td>
          <td>{receipt.created_at}</td>
          <td>{receipt.location}</td>
          <td>${receipt.total}</td>
          <td>{receipt.status}</td>
          <td>{receipt.approve_by}</td>
          </tr>
        )}
        </tbody>
        </table>
        Total: ${this.total(this.state.receipts)}
      </div>
    );
  }
}

export default App;