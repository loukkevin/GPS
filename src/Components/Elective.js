import React, { Component } from "react";
import Course from "./Course";
import styles from "./elective.css";

class Elective extends Component {
  constructor(props) {
    super(props);
    let type = "";
    if (this.props.numCredits > 0) {
      type = "credit";
    } else {
      type = "course";
    }
    this.selectCourseHandler = this.selectCourseHandler.bind(this);
    this.state = {
      title: this.props.title,
      courses: this.props.courses,
      numCredits: this.props.numCredits,
      numCourses: this.props.numCourses,
      fulfilled: false,
      numSelected: 0,
      electiveType: type,
      coursesSelected: []
    };
  }

  selectCourseHandler(course, selected) {
    console.log("in Handler");
    if (this.state.electiveType === "credit") {
      if (selected) {
        this.setState({ numSelected: this.state.numSelected + course.credits });
        let courses = this.state.coursesSelected;
        let courseName = course.name;
        console.log("courseName " + courseName);
        courses.push({
          name: course.name,
          key: course.name
        });
        this.setState({ coursesSelected: courses });
      } else {
        this.setState({ numSelected: this.state.numSelected - course.credits });
        var courses = this.state.coursesSelected;
        var courseName = "";
        for (var index = 0; index < courses.length; index++) {
          courseName = courses[index].name;
          if (courseName === course.name) {
            courses.splice(index, 1);
            this.setState({ coursesSelected: courses });
          }
        }
      }
    } else {
      if (selected) {
        this.setState({ numSelected: this.state.numSelected + 1 });
        let courses = this.state.coursesSelected;
        let courseName = course.name;
        console.log("courseName " + courseName);
        courses.push({
          name: course.name,
          key: course.name
        });
        this.setState({ coursesSelected: courses });
      } else {
        this.setState({ numSelected: this.state.numSelected - 1 });
        var courses = this.state.coursesSelected;
        var courseName = "";
        for (var index = 0; index < courses.length; index++) {
          courseName = courses[index].name;
          if (courseName === course.name) {
            courses.splice(index, 1);
            this.setState({ coursesSelected: courses });
          }
        }
      }
    }
    if (this.state.electiveType === "credit") {
      if (this.state.numSelected >= this.state.numCredits) {
        this.setState({ fulfilled: true });
      } else {
        this.setState({ fulfilled: false });
      }
    } else {
      if (this.state.numSelected >= this.state.numCourses) {
        this.setState({ fulfilled: true });
      } else {
        this.setState({ fulfilled: false });
      }
    }
  }

  render() {
    let courses = this.state.courses;
    let numCredits = this.state.numCredits;
    let numSelected = this.state.numSelected;
    let fulfilled = this.state.fulfilled;
    let numCourses = this.state.numCourses;
    let type = this.state.electiveType;

    const fulfilledStyle = {
      border: "2px solid black",
      backgroundColor: "#4dff4d",
      margin: "auto",
      horizontalAlign: "center",
      overflow: "auto"
    };

    console.log(courses);
    console.log(numCredits);
    console.log(numSelected);
    console.log(fulfilled);

    //if elective is fulfilled, this is rendered
    if (
      (type === "credit" && numCredits <= numSelected) ||
      (type === "course" && numCourses <= numSelected)
    ) {
      return (
        <div style={fulfilledStyle}>
          <table>
            <tbody>
              <tr className="electiveRow" style={styles.electiveRowStyle}>
                {courses.map(course => (
                  <td>
                    <Course
                      key={course.name}
                      disabled={this.state.fulfilled}
                      selectCourseHandler={this.selectCourseHandler}
                      name={course.name}
                      prerequisites={course.prerequisites}
                      credits={course.credits}
                      description={course.description}
                      status="unselected"
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td>Credits: {this.state.numCredits}</td>
                <td>Courses: {this.state.numCourses}</td>
                <td>Num Selected: {this.state.numSelected}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    } else {
      //if elective is not fulfilled, this is rendered
      const electiveStyle = {
        border: "2px solid black",
        margin: "auto",
        overflow: "auto"
      };
      const rowStyle = {
        width: "75%"
      };

      return (
        <div style={electiveStyle}>
          <table>
            <tbody>
              <tr className="electiveRow" style={rowStyle}>
                {courses.map(course => (
                  <td>
                    <Course
                      key={course.name}
                      selectCourseHandler={this.selectCourseHandler}
                      disabled={true}
                      name={course.name}
                      prerequisites={course.prerequisites}
                      credits={course.credits}
                      description={course.description}
                      status="unselected"
                    />
                  </td>
                ))}
              </tr>
              <tr>
                <td>Credits: {this.state.numCredits}</td>
                <td>Courses: {this.state.numCourses}</td>
                <td>Num Selected: {this.state.numSelected}</td>
              </tr>
            </tbody>
          </table>
        </div>
      );
    }
  }
}

export default Elective;
