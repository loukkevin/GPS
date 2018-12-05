import React, { Component } from "react";
import Course from "./Course";
//import ReactTable from "react-table";

class ElectiveCourses extends Component {
  constructor(props) {
    super(props);
    this.state = {
      electiveCourses: [],
      courseAdded: false
    };
    this.selectedCourseHandler = this.selectedCourseHandler.bind(this);
  }

  componentDidMount() {
    this.setState({ electiveCourses: this.props.electiveCourses });
    var test = this.props.electiveCourses;
    console.log("componentDidMount electiveCourses " + test.length);
  }

  selectedCourseHandler(course, credits,description,prerequisites,semestersOffered, isSelected) {
    var fromElectives = true;
    console.log("in electiveCourses handler" + course + "credits=" + credits);
    this.props.handleSelectedCourse(course,credits,description,prerequisites,semestersOffered, fromElectives);
  }

  componentWillReceiveProps(props) {
    if (props.courseAdded) {
      this.setState({ courseAdded: true });
      var courses = this.state.electiveCourses;
      var courseName = "";
      for (var index = 0; index < courses.length; index++) {
        courseName = courses[index].name;
        if (courseName === this.props.selectedCourseName) {
          courses.splice(index, 1);
          this.setState({ electiveCourses: courses });
        }
      }
      this.props.courseAddedCallback(false);
    } else {
      this.setState({ courseAdded: false });
    }
  }

  render() {
    let courses = this.state.electiveCourses;

    if (courses !== undefined && courses.length > 0) {
      return (
        <table
          style={{
            height: "inherit",
            border: "none",
            overflow: "auto"
          }}
        >
          <thead>
            <tr style={{
            height: "inherit",
            border: "none",
            overflow: "auto",
            fontSize: "25px"
          }}>
              <th>Courses To Add</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {courses.map(course => (
                <Course
                  selectCourseHandler={this.selectedCourseHandler}
                  key={course.name}
                  name={course.name}
                  credits={course.credits}
                  description={course.description}
                  prerequisites={course.prerequisites}
                  semestersOffered={course.semestersOffered}
                  courseAdded={this.state.courseAdded}
                  fulfilled={this.props.courseIsSelected}
                />
              ))}
            </tr>
          </tbody>
        </table>
      );
    } else {
      return (
        <table
          style={{
            height: "inherit",
            border: "2px solid black",
            overflow: "auto"
          }}
        >
          <thead>
            <tr style={{
            height: "inherit",
            border: "none",
            overflow: "auto",
            fontSize: "25px"
          }}>
              <th>Courses To Add</th>
            </tr>
          </thead>
          <tbody>
            <tr
              style={{
                height: "inherit",
                border: "none",
                overflow: "auto",
                textAlign: "center",
                fontSize: "3vw",
                color: "green"
              }}
            >
              <td>No Additional Courses Needed</td>
            </tr>
          </tbody>
        </table>
      );
    }
  }
}
export default ElectiveCourses;
