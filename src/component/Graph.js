import React, { Component } from 'react';
var DoughnutChart = require("react-chartjs").Doughnut;
var BarChart = require("react-chartjs").Bar;

class Graph extends Component {

  categoryChart(dataArray){
    let colors = ["#EC5850", "#EF9E65", "#FBD368", "#64DBA0",  "#0B7B85"];
    let results = [];
    dataArray.forEach(function(d){
      let match = results.find(function(r) {return r.label === d.cat_name});
      if (!match) {
        results.push({label: d.cat_name, value: (d.total/100)});
      } else {
        let newMatchValue = match.value + (d.total/100);
        results = results.filter(function(item) {
            return item !== match;
          });
        results.push({label: d.cat_name, value: newMatchValue});
      }
    });
    results.forEach(function(r, i) {
      r.color = colors[i%5];
      r.value = r.value.toFixed(2);
    });
    return results;
  }

    projectChart(dataArray){
    let colors = ["#0B7B85","#64DBA0","#FBD368", "#EF9E65", "#EC5850"];
    let results = [];
    dataArray.forEach(function(d){
      let match = results.find(function(r) {return r.label === d.project_name});
      if (!match) {
        results.push({label: d.project_name, value: (d.total/100)});
      } else {
        let newMatchValue = match.value + (d.total/100);
        results = results.filter(function(item) {
            return item !== match;
          });
        results.push({label: d.project_name, value: newMatchValue});
      }
    });
    results.forEach(function(r, i) {
      r.color = colors[i%5];
      r.value = r.value.toFixed(2);
    });
    return results;
  }

  usersChart(dataArray) {
    let fillColor = "rgb(11, 165, 168, 1)";
    let returnValue = {labels:[], datasets:[{fillColor:fillColor, data:[]}]};
    let results = [];
    dataArray.forEach(function(d){
      let match = results.find(function(r) {return r.label === `${d.first_name} ${d.last_name}`});
      if (!match) {
        results.push({label: `${d.first_name} ${d.last_name}`, value: (d.total/100)});
      } else {
        let newMatchValue = match.value + (d.total/100);
        console.log("users", newMatchValue);
        results = results.filter(function(item) {
            return item !== match;
          });
        results.push({label: `${d.first_name} ${d.last_name}`, value: newMatchValue});
      }
    });
    results.forEach(function(i){
      returnValue.labels.push(i.label);
      returnValue.datasets[0].data.push(i.value.toFixed(2));
    });
    return returnValue;
  }

  render() {
    console.log("all data:", this.props.selectedReceipts);
    console.log("projs: ", this.projectChart(this.props.selectedReceipts));
    console.log("users:", this.usersChart(this.props.selectedReceipts));
    return (
      <div className="all-graphs">
        <div className="cat-chart" >
          <p class="graph-title">Categories</p>
          <DoughnutChart data={this.categoryChart(this.props.selectedReceipts)}/>
        </div>
        <div className="proj-chart">
          <p class="graph-title">Projects</p>
          <DoughnutChart data={this.projectChart(this.props.selectedReceipts)}/>
        </div>
        <div className="user-chart">
          <p class="graph-title">Employees</p>
          <BarChart data={this.usersChart(this.props.selectedReceipts)}/>
        </div>
      </div>
      );
  }
}

export default Graph;