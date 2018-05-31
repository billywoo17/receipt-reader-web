import React, { Component } from 'react';
import './App.css';

class App extends Component {
    constructor(props) {
    super(props);
    this.state = {value: '', result:{parsedtext:'nothing yet'}};
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getResult = this.getResult.bind(this)
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit(event) {
    alert('A name was submitted: ' + this.state.value);
    fetch('/image', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        url: this.state.value
      }),
  });
    event.preventDefault();
  }

  getResult(event) {
     fetch('/image')
      .then(res => res.json())
      .then(result => this.setState({ result }));
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            imageurl:
            <input type="text" value={this.state.value} onChange={this.handleChange} />
          </label>
          <input type="submit" value="Submit" />
        </form>
        <button  onClick={this.getResult}>
        Get result
        </button>
        <div>{this.state.result.parsedtext}
        </div>
      </div>
    );
  }
}

export default App;