import React, { Component } from "react";
import Course from "./Course";
import styles from "./Semester.css";

class Semester extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      credits: this.props.credits,
      courses: [
        {
          name: "se490",
          prerequisites: ["SE 470", " SE 475"],
          credits: 3,
          description: "area of Software Engineering.",
          semestersOffered: ["Fall"]
        },
        {
          name: "se491",
          prerequisites: ["SE 470", " SE 475"],
          credits: 3,
          description: "thin an area of Software Engineering.",
          semestersOffered: ["Fall"]
        }
      ]
    };
  }
  render() {
    const style = {};
    let courses = this.state.courses;
    return (
      <td>
        <th>{this.state.name}</th>
        {courses.map(course => (
          <tr>
            <Course
              key={course.name}
              name={course.name}
              prerequisites={course.prerequisites}
              credits={course.credits}
              description={course.description}
              status="unselected"
            />
          </tr>
        ))}
        <tfoot><tf>{this.state.credits}</tf></tfoot>
      </td>
    );
  }
}

export default Semester;
