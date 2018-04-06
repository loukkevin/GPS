import React, { Component } from "react";
import Course from "./Course";
import Plan from "./Plan";
import ElectiveCourses from "./ElectiveCourses";
import InfoPanel from "./InfoPanel";

class PlanPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requirements: [
        { requiredCourse: "SE 240" },
        { requiredCourse: "SE 245" }
      ],
      electiveCourses: [],
      requiredCourses: [],
      selectedCourseName: "name",
      selectedCourseDescription: "description",
      selectedCoursePrerequisites: [],
      selectedCourseSemestersOffered: [],
      selectedCourseCredits: 0,
      courseIsSelected: false
    };
  }

  componentWillMount() {
    this.setState({ requirements: this.props.requirements });
    this.setState({ electiveCourses: this.props.electiveCourses });
    this.getRequirementCourses();
    this.handleSelectedCourse = this.handleSelectedCourse.bind(this);
  }

  getRequirementCourses() {
    var requirements = [];
    var requiredCourses = [];
    requirements = this.state.requirements;
    for (var i = 0; i < requirements.length; i++) {
      requiredCourses.push(requirements[i].requiredCourse);
      console.log(requirements[i].requiredCourse + " ");
    }
    this.setState({ requiredCourses: requiredCourses });
  }

  handleSelectedCourse(course, fromElectives) {
    this.setState({
      selectedCourseName: course.state.name,
      selectedCourseDescription: course.state.description,
      selectedCourseCredits: course.state.credits,
      selectedCoursePrerequisites: course.state.prerequisites,
      selectedCourseSemestersOffered: course.state.semestersOffered
    });
    this.setState(prevState => ({
      courseIsSelected: !prevState.courseIsSelected
    }));

    console.log("in plan page course handler" + this.state.courseIsSelected);
  }

  render() {
    let requiredCourses = this.state.requiredCourses;
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
    const lowerSectionDivStyle = {
      height: "200px",
      width: "100%",
      border: "1px solid black",
      overflow: "auto"
    };
    const electiveCoursesDivStyle = {
      height: "inherit",
      width: "10%",
      scroll: "auto",
      border: "1px solid black"
    };
    const planDivStyle = {
      height: "inherit",
      width: "90%",
      scroll: "auto",
      border: "1px solid black",
      overflow: "auto"
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
                  electiveCourses={[
                    { key: "SE412", name: "SE412", credits: 3 },
                    { key: "SE476", name: "SE476", credits: 3 },
                    { key: "SE477", name: "SE477", credits: 3 },
                    { key: "SE478", name: "SE478", credits: 3 },
                    { key: "SE479", name: "SE479", credits: 3 },
                    { key: "SE480", name: "SE480", credits: 3 }
                  ]}
                />
              </td>
              <td style={planDivStyle}>
                <Plan requiredCourses={this.state.requiredCourses}
                handleSelectedCourse = {this.handleSelectedCourse}
                courseIsSelected = {this.state.courseIsSelected} />
              </td>
            </tr>
          </tbody>
        </table>
        <table style={lowerSectionDivStyle}>
          <tbody>
            <tr>
              <td>
                <InfoPanel
                  name={this.state.selectedCourseName}
                  prerequisites={this.state.selectedCoursePrerequisites}
                  credits={this.state.selectedCourseCredits}
                  semestersOffered={this.state.selectedCourseSemestersOffered}
                  description={this.state.selectedCourseDescription}
                  style={infoPanelStyle}
                  selected={this.state.courseIsSelected}
                />
              </td>

              <td style={optionPanelStyle}>OPTIONS PANEL</td>
            </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default PlanPage;
