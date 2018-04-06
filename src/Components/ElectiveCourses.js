import React, { Component } from "react";
import Course from "./Course";
//import ReactTable from "react-table";

class ElectiveCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      electiveCourses: this.props.electiveCourses
    };
    this.selectedCourseHandler = this.selectedCourseHandler.bind(this);
  }

  selectedCourseHandler(course, isSelected) {
    var fromElectives = true;
    console.log("in electiveCourses handler" + course.state.name);
    this.props.handleSelectedCourse(course, fromElectives);
  }

  render() {
    let courses = this.state.electiveCourses;

    return (
      <table
        style={{
          border: "1px solid black",
          alignContent: "center",
          height: "inherit"
        }}
      >
        <thead>
          <tr>
            <td>Elective Courses</td>
          </tr>
        </thead>
        <tbody>
          {courses.map(course => (
            <tr key={course.name}>
              <Course
                selectCourseHandler={this.selectedCourseHandler}
                key={course.name}
                name={course.name}
              />
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default ElectiveCourses;
