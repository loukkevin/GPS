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
      courses: [],
      selectedCourseName: this.props.selectedCourseName
    };
    this.selectCourseHandler = this.selectCourseHandler.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
    console.log(
      "in electiveCourses handler" +
        course.state.name +
        this.props.courseIsSelected
    );
    this.props.selectedCourseHandler(course, fromElectives);
  }

  handleClick() {
    let name = this.state.name;
    console.log("clicked on semester " + name + this.props.courseIsSelected);
    if (this.props.courseIsSelected) {
      let courses = this.state.courses;
      let courseName = this.state.selectedCourseName;
      console.log("courseName " + courseName);
      courses.push({ name: this.state.selectedCourseName, key: this.state.selectedCourseName });
      this.setState({ courses: courses });
      let courseCredits = 0;
      let api = "http://localhost:8080/getCourseInformation?name="//"https://scsu-gps-server.herokuapp.com/getCourseInformation?name= ";
    fetch(api + this.state.selectedCourseName)
      .then(response => {
        return response.json();
      })
      .then(json => {
          courseCredits = json.credits;
          let totalCredits = this.state.credits + courseCredits;
          console.log(totalCredits);
          this.setState({credits: totalCredits});
      });

      //this.calculateCredits();
      this.props.courseAdded();
    }
  }

  componentDidUpdate() {
    this.updateState();
    console.log("semester component will receive props" + this.props.selectedCourseName);
  }

  updateState() {
    if (this.props.selectedCourseName === this.state.selectedCourseName) {
      console.log(" semester updateState()");
    } else {
      this.setState({
        selectedCourseName: this.props.selectedCourseName,
      });
    }
    console.log("semester.js state.name " +this.state.name);
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
        <table style={{ height: "inherit" }}>
          <tbody>
            <tr style={{ height: "50px" }}>
              {courses.map(course => (
                <Course
                  fulfilled={this.props.courseIsSelected}
                  selectCourseHandler={this.selectCourseHandler}
                  key={course.name}
                  name={course.name}
                  prerequisites={course.prerequisites}
                  credits={course.credits}
                  description={course.description}
                  status="unselected"
                />
              ))}
            </tr>
          </tbody>
        </table>

        <td>{this.state.credits}</td>
      </tr>
    );
  }
}

export default Semester;
