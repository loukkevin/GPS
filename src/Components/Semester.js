import React, { Component } from "react";
import Course from "./Course";
//import styles from "./Semester.css";
//import Draggable from "react-draggable";

// const squareTarget = {
//   drop(props) {
//     moveCourse(props.x, props.y);
//   }
// };

function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver()
  };
}

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

  selectCourseHandler(credits, selected) {
    console.log("in Handler");
    if (this.state.electiveType === "credit") {
      if (selected) {
        this.setState({ numSelected: this.state.numSelected + credits });
      } else {
        this.setState({ numSelected: this.state.numSelected - credits });
      }
    } else {
      if (selected) {
        this.setState({ numSelected: this.state.numSelected + 1 });
      } else {
        this.setState({ numSelected: this.state.numSelected - 1 });
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
    return (
      <tr>
        <td>{this.state.name}</td>
        <td>
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
        </td>
        <td>{this.state.credits}</td>
      </tr>
    );
  }
}

export default Semester;
