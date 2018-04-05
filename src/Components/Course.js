import React, { Component } from "react";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      prerequisites: [],
      credits: this.props.credits,
      description: this.props.name,
      semestersOffered: [],
      isToggleOn: false
    };
    let api = "http://localhost:8080/getCourseInformation?name="; //"https://scsu-gps-server.herokuapp.com/getCourseInformation?name= ";
    fetch(api + this.state.name)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          prerequisites: json.prerequisites,
          credits: json.credits,
          description: json.description,
          semestersOffered: json.semestersOffered
        });
      });
    this.handleClick = this.handleClick.bind(this);
    this.handleStart = this.handleStart.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleDrop = this.handleDrop.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
    if (this.state.isToggleOn) {
      this.props.selectCourseHandler(this, false);
    } else {
      this.props.selectCourseHandler(this, true);
    }
  }

  isSelected() {
    return this.state.isToggleOn;
  }

  handleDrag() {}

  handleDrop() {}

  handleStart() {}

  render() {
    let selected = this.state.isToggleOn;

    if (selected) {
      const style = {
        backgroundColor: "#4CAF50",
        color: "white",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "22px",
        border: "1px solid black",
        width: "103px",
        height: "50px",
        fontWeight: "bold"
      };
      return (
        <td onClick={this.handleClick} style={style}>
          {this.state.name}
        </td>
      );
    } else {
      const style = {
        backgroundColor: "grey",
        color: "black",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "22px",
        width: "103px",
        height: "50px",
        fontWeight: "bold",
        border: "1px solid black",
        margin: ""
      };
      return (
        <td onClick={this.handleClick} style={style}>
          {this.state.name}
        </td>
      );
    }
  }
}

export default Course;
