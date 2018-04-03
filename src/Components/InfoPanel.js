import React, { Component } from "react";
import Semester from "./Semester";
//import ReactTable from "react-table";

class InfoPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      course: this.props.course,
      selected: this.props.selected
    };
  }

  render() {
    var style = this.props.style;

    let semesters = this.state.semesters;

    if (this.state.selected) {
      return (
        <table style={style}>
          <tbody>
            <tr>
              <td>Name: {this.state.course.name}</td>
            </tr>
            <tr>
              <td>Prerequisites: {this.state.course.prerequisites}</td>
            </tr>
            <tr>
              <td>Credits: {this.state.course.credits}</td>
            </tr>
            <tr>
              <td>Semesters Offered: {this.state.course.semestersOffered}</td>
            </tr>
            <tr>
              <td>Description: {this.state.course.description}</td>
            </tr>
          </tbody>
        </table>
      );
    }else{
      return (
        <div></div>
      );
    }
  }
}
export default InfoPanel;
