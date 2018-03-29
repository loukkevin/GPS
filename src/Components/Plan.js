import React, { Component } from "react";
import Semester from "./Semester";

class Plan extends Component {
  constructor() {
    super();
    this.state = {
      semesters: [],
      requirements: [],
      electiveCourses: []
    };
  }

  render() {
    return (
      <div>
        <table>
          <tr>
            <Semester name = "Fall 2018" credits = {3} />
            <Semester name = "Spring 2019" credits = {3} />
            <Semester name = "Fall 2019" credits = {3} />
            <Semester name = "Spring 2020" credits = {3} />
            <Semester name = "Fall 2020" credits = {3} />
            <Semester name = "Sring 2021" credits = {3} />
            <Semester name = "Fall 2021" credits = {3} />
            <Semester name = "Spring 2022" credits = {3} />
          </tr>
        </table>
      </div>
    );
  }
}
export default Plan;
