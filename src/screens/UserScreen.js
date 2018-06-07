import React, { Component } from 'react';
import Receipt from '../Receipt.js';

class UserScreen extends Component {

  total(receiptsArr) {
    var sum = 0;
    receiptsArr.forEach(function (value) {
      sum += value.total;
    });
    return sum;
  }

  render() {
    return (
      <div className="screen">
        <ul className="mdc-list mdc-list--two-line mdc-list--avatar-list">
          { this.props.selectedReceipts.map(receipt => <Receipt { ...receipt }/> )}
        </ul>

        <div className="total">
          Total: ${parseFloat(this.total(this.props.selectedReceipts)/100).toFixed(2)}
        </div>

      </div>
      );
  }
}

export default UserScreen;





//     return



