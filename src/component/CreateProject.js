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
    fetch('/projects', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        project_name: this.state.project,
      }),
    }).then((results) =>{
      console.log("we are in here", results);
      this.props.toggleCreateProjectModal();
    }).catch((err) => {
      alert("can't update status", err);
    });
    let currentProject = this.props.currentProject;
    currentProject.unshift(this.state.project);
    this.props.addProject(currentProject);

  }
}

  _project_input(event) {
    this.setState({project: event.target.value});
  }
  render() {
    return (
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        <h4 style={{order:1, margin: '1.4em 2em 0 2em', fontWeight: 'bold'}}>Create a Project </h4>
        <div style={{order:2, margin: '1em 2em 1em 2em'}}>
          <input placeholder="Project Name" type="text" onChange={this._project_input} className="mdc-text-field__input"/>
        </div>

        <div style={{order:3, margin: '0 2em 2em 2em'}}>
          <button type="button" className="btn btn-lg signInButton" onClick={this.submitForm}>Create</button>
        </div>

      </div>
      );
  }
}

export default CreateProject;