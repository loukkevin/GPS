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

  selectedCourseHandler(course,isSelected){
    var fromElectives = true;
    this.props.handleSelectedCourse(course,fromElectives);
  }

  render() {
    let courses = this.state.electiveCourses;


    return (
      <table style = {{border: "1px solid black",
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
              selectCourseHandler={this.selectedCourseHandler}
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
