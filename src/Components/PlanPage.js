import React, { Component } from "react";
import Course from "./Course";
import Plan from "./Plan";
import ElectiveCourses from "./ElectiveCourses";

class PlanPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      requirements: [
        { requiredCourse: "SE 240" },
        { requiredCourse: "SE 245" }
      ],
      electiveCourses: [],
      requiredCourses: []
    };
  }

  componentWillMount() {
    this.setState({ requirements: this.props.requirements });
    this.setState({ electiveCourses: this.props.electiveCourses });
    this.getRequirementCourses();
  }

  getRequirementCourses() {
    var requirements = [];
    var requiredCourses = [];
    requirements = this.state.requirements;
    for (var i = 0; i < requirements.length; i++) {
      requiredCourses.push(requirements[i].requiredCourse);
      console.log(requirements[i].requiredCourse);
    }
    this.setState({ requiredCourses: requiredCourses });
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
        <tbody>
          <tr style={tableRowStyle}>
            <td style={{ height: "inherit" }}>
              <ElectiveCourses
                electiveCourses={[
                  { name: "SE412", credits: 3 },
                  { name: "SE476", credits: 3 },
                  { name: "SE477", credits: 3 },
                  { name: "SE478", credits: 3 },
                  { name: "SE479", credits: 3 },
                  { name: "SE480", credits: 3 }
                ]}
              />
            </td>
            <td style={planDivStyle}>
              <Plan />
            </td>
          </tr>
          </tbody>
        </table>
        <table style={lowerSectionDivStyle}>
        <tbody>
          <tr>
            <td style={infoPanelStyle}> INFO PANEL</td>
            <td style={optionPanelStyle}>OPTIONS PANEL</td>
          </tr>
          </tbody>
        </table>
      </div>
    );
  }
}
export default PlanPage;
