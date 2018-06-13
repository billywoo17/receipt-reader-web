import React, { Component } from 'react';
import './App.css';
import App from './App';
import Login from './Login';
import Moment from 'react-moment';
import ReactModal from 'react-modal';
class Receipt extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      status:props.status_id
    };
    this.toggleModal = this.toggleModal.bind(this);
    this._approved = this._approved.bind(this);
    this._denied = this._denied.bind(this);
    this.approvedStatus = this.approvedStatus.bind(this);
    this.deniedStatus = this.deniedStatus.bind(this);
  }
  componentWillReceiveProps(newProps) {
    this.setState({status: newProps.status_id})
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    });
  }

  _updateServer(receipt_id, status_id) {
    return fetch('http://ec2-18-188-40-128.us-east-2.compute.amazonaws.com:8080/users/receipt/status', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        receipt_id: receipt_id,
        status_id: status_id
      }),
    })
    .catch((err) => {
      alert("can't update status", err);
    });
  }


  _approved(){
    this.setState({status : 2})
    this._updateServer(this.props.id, 2);
  }

  _denied(){
    this.setState({status : 3})
    this._updateServer(this.props.id, 3)
  }

  approvedStatus(status) {
      if(status === 2){
        return <i className="fas fa-check-circle text-success icons-size" onClick={this._approved}></i>
      }else{
        return <i className="fas fa-check-circle text-secondary icons-size" onClick={this._approved}></i>
      }
    }

  deniedStatus(status) {
      if(status === 3){
        return <i className="fas fa-exclamation-triangle text-danger icons-size" onClick={this._denied}></i>
      }else{
        return <i className="fas fa-exclamation-triangle text-secondary icons-size" onClick={this._denied}></i>
      }
    }

  statusCheck(status) {
    if (status === 1) {
      return <i className="fas fa-ellipsis-h mdc-list-item__graphic orange text-warning"></i>
    } else if (status === 2) {
      return <i className="fas fa-check-circle mdc-list-item__graphic text-success"></i>
    } else if (status === 3) {
      return <i className="fas fa-exclamation-triangle mdc-list-item__graphic text-danger"></i>
    }
  };

  render() {
    let statusWord = {
      1:"Pending",
      2:"Approved",
      3:"Denied"
    }


    const { id, date, location, description, total, image_url, status_id} = this.props;
    return (
      <div>
        <li className="mdc-list-item mdc-ripple-surface" key = {id} onClick={ this.toggleModal }>
          {this.statusCheck(this.state.status)}
          <span className="mdc-list-item__text" >
            <Moment format="DD/MM/YYYY">{date}</Moment>
              <span className="mdc-list-item__secondary-text">
                {location} - {description}
              </span>
            </span>
          <span className="mdc-list-item__meta">
            ${parseFloat(total/100).toFixed(2)}
          </span>
        </li>
        <ReactModal
            className="modal flex-element"
            isOpen={this.state.isModalOpen}
            contentLabel="Modal"
            style={{content: {backgroundColor:"white"} }}
            >
            <div className="modal-list">
              <h2 className="">Details</h2>
              <div className="receipt-modal-list">
                <p className="modal-list-item">Purchased Date: <Moment format="DD/MM/YYYY">{date}</Moment></p>
                <p className="modal-list-item">Location: {location}</p>
                <p className="modal-list-item">Description: {description}</p>
                <p className="modal-list-item">Amount: ${parseFloat(total/100).toFixed(2)}</p>
                <p className="modal-list-item">Status: {statusWord[this.state.status]}</p>
                {this.props.isAdmin ?
                <div className="admin-buttons">
                <button type="button" class="btn btn-light">
                {this.approvedStatus(this.state.status)}
                </button>
                <button type="button" class="btn btn-light">
                {this.deniedStatus(this.state.status)}
                </button>
                <button className="btn close-button" onClick={this.toggleModal}>
                Close
                </button>
                </div>
                :
                <button className="btn close-button" onClick={this.toggleModal}>
                Close
                </button>}
              </div>

            </div>
            <div className="modal-pic">
              <img src={image_url} alt="demo" className="receipt-pic"/>
            </div>
        </ReactModal>
      </div>
    )
  }
}
export default Receipt;