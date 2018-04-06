import React, { Component } from "react";
import Course from "./Course";
//import styles from "./Semester.css";
//import Draggable from "react-draggable";

class Semester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      credits: 0,
      courses: []
    };
    this.selectCourseHandler = this.selectCourseHandler.bind(this);
  }

  componentWillMount() {
    this.setState({ courses: this.props.courses });
    this.calculateCredits();
  }

  calculateCredits() {
    let courses = this.state.courses;
    let calcCredits = 0;
    for (var i = 0; i < courses.length; i++) {
      console.log("calculating credits, course: " + courses[i].name);
      calcCredits = calcCredits + courses[i].credits;
    }
    this.setState({ credits: this.state.credits + calcCredits });
  }

  selectCourseHandler(course, isSelected) {
    var fromElectives = false;
    console.log("in electiveCourses handler" + course.state.name);
    this.props.selectedCourseHandler(course, fromElectives);
  }

  render() {
    const style = {
      border: "1px dotted black",
      textAlign: "left"
    };
    let courses = this.state.courses;
    return (
      <tr style={style}>
        <td onClick={this.handleClick}>{this.state.name}</td>
        {courses.map(course => (
          <Course
            disabled={false}
            selectCourseHandler={this.selectCourseHandler}
            key={course.name}
            name={course.name}
            prerequisites={course.prerequisites}
            credits={course.credits}
            description={course.description}
            status="unselected"
          />
        ))}
        <td>{this.state.credits}</td>
      </tr>
    );
  }
}

export default Semester;
