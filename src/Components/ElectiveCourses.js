import React, { Component } from "react";
import Course from "./Course";
//import ReactTable from "react-table";

class ElectiveCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      electiveCourses: this.props.electiveCourses
    };
  }

  render() {
    let courses = this.state.electiveCourses;


    return (
      <table style = {{border: "3px solid black",
      alignContent: "center",
      height: "inherit",
      }}>
          <thead>
            <th>Elective Courses</th>
          </thead>
          <tbody>
          <td>
          {courses.map(course => (
            <tr><Course
              disabled={false}
              selectCourseHandler={this.selectCourseHandler}
              key={course.name}
              name={course.name}
              prerequisites={course.prerequisites}
              credits={course.credits}
              description={course.description}
              status="unselected"
            /></tr>
          ))}
        </td></tbody>
      </table>
    );
  }
}
export default ElectiveCourses;
