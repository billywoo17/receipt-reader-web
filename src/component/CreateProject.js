import React, { Component } from 'react';

class CreateProject extends Component {
  constructor(props) {
    super(props);
    this.state = {
      project: null,
    };
    this._project_input = this._project_input.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }

  submitForm() {

    if(this.state.project){
    fetch('http://ec2-18-188-40-128.us-east-2.compute.amazonaws.com:8080/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project_name: this.state.project,
      }),
    }).then((results) =>{
      this.props._toggleCreateProject()
    }).catch((err) => {
      alert("can't update status", err);
    });
    let currentProject = this.props.currentProject
    currentProject.unshift(this.state.project)
    this.props.addProject(currentProject)

  }
}

  _project_input(event) {
    this.setState({project: event.target.value});
  }
  render() {
    return (
      <div>
      <input placeholder="Project Name" type="text" onChange={this._project_input} className="createProject mdc-text-field__input"/>
        <button type="button" className="btn btn-lg signInButton" onClick={this.submitForm}>Create</button>
      </div>
      );
  }
}

export default CreateProject;