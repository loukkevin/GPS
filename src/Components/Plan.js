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
      electiveCourses: [],
      selectedCourseName: this.props.selectedCourseName
    };
    this.selectedCourseHandler = this.selectedCourseHandler.bind(this);
    this.courseAdded = this.courseAdded.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  selectedCourseHandler(course, isSelected) {
    var fromElectives = false;
    console.log("in planCourse handler" + course.state.name);
    this.props.handleSelectedCourse(course, fromElectives);
  }

  courseAdded(){
    this.props.courseAdded();
  }

  componentDidUpdate() {
    this.updateState();
    console.log("infopanel component will receive props" + this.props.name);
  }

  updateState() {
    if (this.props.selectedCourseName === this.state.selectedCourseName) {
      console.log(" plan updateState()");
    } else {
      this.setState({
        selectedCourseName: this.props.selectedCourseName,
      });
    }
    console.log("plan.js state.name " +this.state.selectedCourseName);
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
              selectedCourseHandler={this.selectedCourseHandler}
              courseIsSelected={this.props.courseIsSelected}
              selectedCourseName={this.state.selectedCourseName}
              courseAdded={this.courseAdded}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
export default Plan;
