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
    }
    this.toggleModal = this.toggleModal.bind(this);
  }

  toggleModal() {
    this.setState({
      isModalOpen: !this.state.isModalOpen
    })
    console.log(this.state)
  }

  render() {

    function statusCheck (status) {
      if (status === 1) {
        return <i className="fas fa-check-circle mdc-list-item__graphic text-success"></i>
      } else if (status === 2) {
        return <i className="fas fa-ellipsis-h mdc-list-item__graphic orange text-warning"></i>
      } else if (status === 3) {
        return <i className="fas fa-exclamation-triangle mdc-list-item__graphic text-danger"></i>
      }
    };

    const { id, date, location, description, total, image_url, status_id} = this.props;

    return (
      <li className="mdc-list-item mdc-ripple-surface" key = {id} onClick={ this.toggleModal }>
        {statusCheck(status_id)}
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
          className="modal flex-element"
          isOpen={this.state.isModalOpen}
          contentLabel="Modal"
          >
          <div className="modal-list">
            <h2 className="list-align">Details</h2>
            <ul className="mdc-list">
              <li className="mdc-list-item">Purchased date: <Moment format="DD/MM/YYYY">{date}</Moment></li>
              <li className="mdc-list-item">Location: {location}</li>
              <li className="mdc-list-item">Description: {description}</li>
              <li className="mdc-list-item">Amount: ${parseFloat(total/100).toFixed(2)}</li>
              <li className="mdc-list-item">Status: {status_id}</li>
            </ul>
            <button className="mdc-button mdc-button--raised list-align" onClick={this.toggleModal}>Close</button>
          </div>
          <div className="modal-pic">
            <img src={image_url} alt="demo"/>
          </div>
        </ReactModal>
      </li>
    )
  }
}
export default Receipt;