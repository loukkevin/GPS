import React, { Component } from "react";
import Plan from "./Plan";
import ElectiveCourses from "./ElectiveCourses";
import InfoPanel from "./InfoPanel";

class PlanPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requirements: [],
      electiveCourses: [],
      requiredCourses: [],
      selectedCourseName: "name",
      selectedCourseDescription: "description",
      selectedCoursePrerequisites: [],
      selectedCourseSemestersOffered: [],
      selectedCourseCredits: 0,
      courseIsSelected: false,
      courseAdded: false
    };
  }

  componentWillMount() {
    // this.setState({ requirements: this.props.requirements });
    // this.setState({ electiveCourses: this.props.electiveCourses });
    //this.getRequirementCourses();
    var requirements = this.props.requirements;
    console.log("planPage requirements " + this.props.electiveCourses );
    let courses = [];
    courses = this.props.electiveCourses;
    console.log("courses length " + courses.length);
    for (var i = 0; i < requirements.length; i++) {
      courses.push({
        name: requirements[i].requiredCourse.name,
        key: requirements[i].requiredCourse.name,
        credits: requirements[i].requiredCourse.credits,
        prerequisites: requirements[i].requiredCourse.prerequisites,
        description: requirements[i].requiredCourse.description,
        semestersOffered: requirements[i].requiredCourse.semestersOffered
      });
      console.log(requirements[i].requiredCourse.name + " ");
    }
    console.log("courses length " + courses.length);
    this.setState({ electiveCourses: courses });
    this.handleSelectedCourse = this.handleSelectedCourse.bind(this);
    this.courseAdded = this.courseAdded.bind(this);
    this.courseAddedCallback = this.courseAddedCallback.bind(this);
    this.addCourse = this.addCourse.bind(this);
  }

  getRequirementCourses() {
    var requirements = this.props.requirements;
    console.log("planPage requirements " + requirements[0].requiredCourse.name);
    var requiredCourses = this.state.electiveCourses;
    requirements = this.state.requirements;
    for (var i = 0; i < requirements.length; i++) {
      requiredCourses.push({
        name: requirements[i].requiredCourse.name,
        key: requirements[i].requiredCourse.name,

      });
      console.log(requirements[i].requiredCourse + " ");
    }
    this.setState({ requiredCourses: requiredCourses });
  }

  addCourse() {
    return this.state.selectedCourseName;
  }

  handleSelectedCourse(
    course,
    credits,
    description,
    prerequisites,
    semestersOffered,
    fromElectives
  ) {
    console.log("selected course name=" + course + " selected course credits=" + credits)
    this.setState({
      selectedCourseName: course,
      selectedCourseDescription: description,
      selectedCourseCredits: credits,
      selectedCoursePrerequisites: prerequisites,
      selectedCourseSemestersOffered: semestersOffered
    });
    this.setState(prevState => ({
      courseIsSelected: !prevState.courseIsSelected
    }));

    console.log("in plan page course handler" + this.state.courseIsSelected);
  }

  courseAdded() {
    this.setState(prevState => ({
      courseIsSelected: !prevState.courseIsSelected,
      courseAdded: true
    }));
  }

  courseAddedCallback() {
    this.setState({
      courseAdded: false,
      selectedCourseName: "",
      selectedCourseDescription: "",
      selectedCourseCredits: 0,
      selectedCoursePrerequisites: [],
      selectedCourseSemestersOffered: []

    });
  }

  render() {
    const planPageStyle = {
      height: "inherit",
      width: "inherit",
      margin: "auto",
      padding: "5px"
    };
    const upperSectionDivStyle = {
      height: "700px",
      width: "100%",
      border: "1px solid black",
      margin: "auto"
    };

    const electiveCoursesDivStyle = {
      height: "20%",
      width: "12%",
      border: "1px solid black",
      overflow: "auto"
    };
    const planDivStyle = {
      height: "80%",
      width: "88%",
      scroll: "auto",
      border: "1px solid black",
      overflow: "auto",
      textAlign: "center"
    };
    const infoPanelStyle = {
      height: "inherit",
      width: "50%",
      scroll: "auto",
      overflow: "auto",
      border: "1px solid black"
    };
    const optionPanelStyle = {
      height: "inherit",
      width: "50%",
      scroll: "auto",
      overflow: "auto",
      border: "1px solid black"
    };
    const tableRowStyle = {
      height: "inherit"
    };
    return (
      <div className="PlanPage" style={planPageStyle}>
        <table style={upperSectionDivStyle}>
          <tbody style={upperSectionDivStyle}>
            <tr style={tableRowStyle}>
              <td style={electiveCoursesDivStyle}>
                <ElectiveCourses
                  handleSelectedCourse={this.handleSelectedCourse}
                  electiveCourses={this.state.electiveCourses}
                  courseAdded={this.state.courseAdded}
                  selectedCourseName={this.state.selectedCourseName}
                  courseAddedCallback={this.courseAddedCallback}
                  courseIsSelected={this.state.courseIsSelected}
                />
              </td>
            </tr>
            <tr>
              <td>
                <InfoPanel
                  name={this.state.selectedCourseName}
                  prerequisites={this.state.selectedCoursePrerequisites}
                  credits={this.state.selectedCourseCredits}
                  semestersOffered={this.state.selectedCourseSemestersOffered}
                  description={this.state.selectedCourseDescription}
                  selected={this.state.courseIsSelected}
                />
              </td>
            </tr>
            <tr>
              <td style={planDivStyle}>
                Graduation Plan
                <Plan
                  requiredCourses={this.state.requiredCourses}
                  handleSelectedCourse={this.handleSelectedCourse}
                  courseIsSelected={this.state.courseIsSelected}
                  selectedCourseName={this.state.selectedCourseName}
                  selectedCourseCredits={this.state.selectedCourseCredits}
                  courseAdded={this.courseAdded}
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default PlanPage;
