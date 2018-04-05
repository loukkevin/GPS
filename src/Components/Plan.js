import React, { Component } from "react";
import Semester from "./Semester";
//import ReactTable from "react-table";
import "./plan.css";

class Plan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      semesters: [
        {
          name: "Fall 2018",
          credits: 3,
          courses: [
            { name: "SE240", credits: 3 },
            { name: "SE245", credits: 3 }
          ]
        },
        {
          name: "Spring 2019",
          credits: 3,
          courses: [
            { name: "SE231", credits: 4 },
            { name: "SE221", credits: 4 }
          ]
        },
        {
          name: "Fall 2019",
          credits: 3,
          courses: [
            { name: "CSCI201", credits: 3 },
            { name: "MATH221", credits: 3 }
          ]
        },
        {
          name: "Spring 2020",
          credits: 3,
          courses: [
            { name: "SE460", credits: 3 },
            { name: "SE465", credits: 4 }
          ]
        },
        {
          name: "Fall 2020",
          credits: 3,
          courses: [
            { name: "SE470", credits: 3 },
            { name: "SE475", credits: 3 }
          ]
        },
        {
          name: "Spring 2021",
          credits: 3,
          courses: [
            { name: "SE480", credits: 4 },
            { name: "CSCI411", credits: 4 }
          ]
        },
        {
          name: "Fall 2021",
          credits: 3,
          courses: [
            { name: "SE490", credits: 3 },
            { name: "MATH271", credits: 3 }
          ]
        },
        {
          name: "Spring 2022",
          credits: 3,
          courses: [
            { name: "SE491", credits: 3 },
            { name: "MATH312", credits: 4 }
          ]
        }
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
      <table className="sturdy">
        <thead>
          <tr>
            <th style={{ width: "10%" }}>Semester</th>
            <th style={{columnSpan: 6}}>Courses</th>
            <th style={{ width: "10%" }}>Credits</th>
          </tr>
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
