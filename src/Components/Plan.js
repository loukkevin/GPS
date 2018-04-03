import React, { Component } from "react";
import Semester from "./Semester";
//import ReactTable from "react-table";
import "./plan.css";

class Plan extends Component {
  constructor() {
    super();
    this.state = {
      semesters: [
        {
          name: "Fall 2018",
          credits: 3,
          courses: [{ name: "SE 101", credits: 3 }, { name: "SE 101", credits: 3 }]
        },
        {
          name: "Spring 2018",
          credits: 3,
          courses: [{ name: "SE 101", credits: 4 }, { name: "SE 101", credits: 4 }]
        },
        {
          name: "Fall 2018",
          credits: 3,
          courses: [{ name: "SE 101", credits: 3 }, { name: "SE 101", credits: 3 }]
        },
        {
          name: "Spring 2018",
          credits: 3,
          courses: [{ name: "SE 101", credits: 4 }, { name: "SE 101", credits: 4 }]
        },
        {
          name: "Fall 2018",
          credits: 3,
          courses: [{ name: "SE 101", credits: 3 }, { name: "SE 101", credits: 3 }]
        },
        {
          name: "Spring 2018",
          credits: 3,
          courses: [{ name: "SE 101", credits: 4 }, { name: "SE 101", credits: 4 }]
        },
        {
          name: "Fall 2018",
          credits: 3,
          courses: [{ name: "SE 101", credits: 3 }, { name: "SE 101", credits: 3 }]
        },
        {
          name: "Spring 2018",
          credits: 3,
          courses: [{ name: "SE 101", credits: 4 }, { name: "SE 101", credits: 4 }]
        },
      ],
      requirements: [],
      electiveCourses: []
    };
  }

  render() {
    const tableStyle = {
      height: "100%",
      width: "100%",
      overflow: "scroll",
      display: "flex",
      flexDirection: "row"
    };

    let semesters = this.state.semesters;
    return (
      <table class="sturdy">
        <thead>
          <th style={{ width: "10%" }}>Semester</th>
          <th>Courses</th>
          <th style={{ width: "10%" }}>Credits</th>
        </thead>
        <tbody>
          {semesters.map(semester => (
            <Semester
              key={semester.name}
              name={semester.name}
              credits={semester.credits}
              courses={semester.courses}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
export default Plan;
