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
  _graphToggle(){
    this.setState({showGraph: !this.state.showGraph})
  }
  render() {
    return (
      <div className="info-screen">

        {this.props.isAdmin ?
        <div className="graph-container">Graph
          {this.state.showGraph ? <Graph selectedReceipts={this.props.selectedReceipts}/>: <a/>}
          <button type="button" className="mdc-button mdc-button--raised" onClick={this._graphToggle}>{this.state.showGraph ? "Hide" : "Show"}</button>
        </div>: <a/> }
        <div className="list-container">
          <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list main-list">
            { this.props.selectedReceipts.map(receipt => <Receipt { ...receipt } isAdmin={this.props.isAdmin}/> )}
          </ul>

          <div className="total-amount">
            Total: ${parseFloat(this.total(this.props.selectedReceipts)/100).toFixed(2)}
          </div>

        </div>
      </div>
      );
  }
}

export default UserScreen;