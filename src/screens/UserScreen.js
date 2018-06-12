import React, { Component } from 'react';
import Receipt from '../Receipt.js';
import Graph from '../component/Graph.js';
class UserScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showGraph: false,
    };
    this._graphToggle = this._graphToggle.bind(this);

  }

  total(receiptsArr) {
    var sum = 0;
    receiptsArr.forEach(function (value) {
      sum += value.total;
    });
    return sum;
  }

  approvedTotal(receiptsArr) {
    var sum = 0;
    receiptsArr.forEach(function (value) {
      if(value.status_id === 2){
      sum += value.total;
      }
    });
    return sum;
  }

  rejectedTotal(receiptsArr) {
    var sum = 0;
    receiptsArr.forEach(function (value) {
      if(value.status_id === 3){
      sum += value.total;
      }
    });
    return sum;
  }
  _graphToggle(){
    this.setState({showGraph: !this.state.showGraph})
  }
  render() {
    return (
      <div className="info-screen">

        {this.props.isAdmin ?
        <div>
        <h4 className="admin-title"> Admin Dashboard </h4>
        <div className="graph-container">
        <Graph selectedReceipts={this.props.selectedReceipts}/>
        </div>
        </div>: <a/> }
        <div className="list-container">
          <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list main-list">
            { this.props.selectedReceipts.map(receipt => <Receipt { ...receipt } isAdmin={this.props.isAdmin}/> )}
          </ul>

          <div className="total-amount">
            Reject Total: ${parseFloat(this.rejectedTotal(this.props.selectedReceipts)/100).toFixed(2)}<br/>
            Approved Total: ${parseFloat(this.approvedTotal(this.props.selectedReceipts)/100).toFixed(2)}<br/>
            Total: ${parseFloat(this.total(this.props.selectedReceipts)/100).toFixed(2)}
          </div>

        </div>
      </div>
      );
  }
}

export default UserScreen;