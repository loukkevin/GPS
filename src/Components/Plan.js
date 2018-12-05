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
          credits: 0,
          courses: [
          ]
        },
        {
          name: "Spring 2019",
          credits: 0,
          courses: [

          ]
        },
        {
          name: "Fall 2019",
          credits: 0,
          courses: [

          ]
        },
        {
          name: "Spring 2020",
          credits: 0,
          courses: [

          ]
        },
        {
          name: "Fall 2020",
          credits: 0,
          courses: [
          ]
        },
        {
          name: "Spring 2021",
          credits: 0,
          courses: [

          ]
        },
        {
          name: "Fall 2021",
          credits: 0,
          courses: [

          ]
        },
        {
          name: "Spring 2022",
          credits: 0,
          courses: [

          ]
        }
      ],
      requirements: [],
      electiveCourses: [],
      selectedCourseName: this.props.selectedCourseName,
      selectedCourseCredits: this.props.selectedCourseCredits
    };
    this.selectedCourseHandler = this.selectedCourseHandler.bind(this);
    this.courseAdded = this.courseAdded.bind(this);
    this.updateState = this.updateState.bind(this);
  }

  selectedCourseHandler(course, isSelected) {
    var fromElectives = false;
    //console.log("in planCourse handler" + course.state.name);
    this.props.handleSelectedCourse(course, fromElectives);
  }

  courseAdded(){
    this.props.courseAdded();
  }

  componentDidUpdate() {
    this.updateState();
    //console.log("infopanel component will receive props" + this.props.name);
  }

  updateState() {
    if (this.props.selectedCourseName === this.state.selectedCourseName) {
      //console.log(" plan updateState()");
    } else {
      this.setState({
        selectedCourseName: this.props.selectedCourseName,
        selectedCourseCredits: this.props.selectedCourseCredits
      });
    }
    console.log("plan.js name= " +this.state.selectedCourseName + "credits="+ this.state.selectedCourseCredits);
  }

  render() {
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
              selectedCourseCredits={this.state.selectedCourseCredits}
              courseAdded={this.courseAdded}
            />
          ))}
        </tbody>
      </table>
    );
  }
}
export default Plan;
