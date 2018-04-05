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
  componentWillReceiveProps() {
    this.setState({ course: this.props.course, selected: this.props.selected });
    console.log("infopanel component will receive props" + this.props.name);
  }

  render() {
    var style = this.props.style;

    let semesters = this.state.semesters;

    if (this.state.selected) {
      return (
        <table style={style}>
          <tbody>
            <tr>
              <td>Name: {this.state.name}</td>
            </tr>
            <tr>
              <td>Prerequisites: {this.state.prerequisites}</td>
            </tr>
            <tr>
              <td>Credits: {this.state.credits}</td>
            </tr>
            <tr>
              <td>Semesters Offered: {this.state.semestersOffered}</td>
            </tr>
            <tr>
              <td>Description: {this.state.description}</td>
            </tr>
          </tbody>
        </table>
      );
    } else {
      return <td>Remember to confirm your plan with your advisor</td>;
    }
  }
}
export default InfoPanel;
