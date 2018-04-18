import React, { Component } from "react";
import Semester from "./Semester";
//import ReactTable from "react-table";

class InfoPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      credits: this.props.credits,
      prerequisites: this.props.prerequisites,
      semestersOffered: this.props.semestersOffered,
      description: this.props.description,
      selected: this.props.selected
    };
  }
  componentDidUpdate() {
    this.updateState();
    console.log("infopanel component will receive props" + this.props.name);
  }

  updateState() {
    if (this.props.name === this.state.name) {
      console.log("updateState()");
    } else {
      this.setState({
        name: this.props.name,
        credits: this.props.credits,
        prerequisites: this.props.prerequisites,
        semestersOffered: this.props.semestersOffered,
        description: this.props.description,
        selected: this.props.selected
      });
    }
  }

  render() {
    var style = this.props.style;
    var prerequisites = this.state.prerequisites;
    var semesters = [];
    semesters = this.state.semestersOffered;
    var semesterString = "";
    var prerequisiteString = "";
    if (semesters !== undefined) {
      for (var i = 0; i < semesters.length; i++) {
        if (i === 0){
          semesterString = semesters[i];
        }
        else{
        semesterString = semesterString + ", " + semesters[i];
        }
        console.log(semesterString);
      }
    }
    if (prerequisites !== undefined) {
      for (var i = 0; i < prerequisites.length; i++) {
        if (i === 0){
          prerequisiteString = prerequisites[i];
        }
        else{
        prerequisiteString = prerequisiteString + ", " + prerequisites[i];
        }
        console.log(prerequisiteString);
      }
    }

    if (this.state.selected) {
      return (
        <table style={style}>
          <tbody>
            <tr>
              <td>Name: {this.state.name}</td>
            </tr>
            <tr>
              <td>Prerequisites: {prerequisiteString}</td>
            </tr>
            <tr>
              <td>Credits: {this.state.credits}</td>
            </tr>
            <tr>
              <td>Semesters Offered: {semesterString}</td>
            </tr>
            <tr>
              <td>Description: {this.state.description}</td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return (
        <table>
          <tbody>
            <tr>
              <td>Remember to confirm your plan with your advisor</td>
            </tr>
          </tbody>
        </table>
      );
    }
  }
}
export default InfoPanel;
