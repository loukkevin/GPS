import React, { Component } from "react";

class Course extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: this.props.name,
      prerequisites: [],
      credits: 0,
      description: this.props.name,
      semestersOffered: [],
      isToggleOn: false
    };

    this.handleClick = this.handleClick.bind(this);
    this.deselectCourse = this.deselectCourse.bind(this);
  }

  componentWillMount() {
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
  }

  componentWillReceiveProps(props) {
    if (props.courseAdded) {
      this.setState({ isToggleOn: false });
    }
  }

  deselectCourse() {
    this.setState({ isToggleOn: false });
  }

  handleClick() {
    if (!this.props.fulfilled) {
      //need to be able to deselect
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
      if (this.isSelected()) {
        this.props.selectCourseHandler(this, true);
      } else {
        this.props.selectCourseHandler(this, false);
      }
    }
    if (this.props.fulfilled && this.isSelected()) {
      this.setState(prevState => ({
        isToggleOn: !prevState.isToggleOn
      }));
      if (this.isSelected()) {
        this.props.selectCourseHandler(this, true);
      } else {
        this.props.selectCourseHandler(this, false);
      }
    }
  }

  isSelected() {
    return this.state.isToggleOn;
  }

  render() {
    let selected = this.state.isToggleOn;

    if (selected) {
      const style = {
        backgroundColor: "green",
        color: "white",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "22px",
        border: "1px solid black",
        width: "110px",
        height: "50px",
        fontWeight: "bold"
      };
      return (
        <td style = {style}> 
          <button onClick={this.handleClick} style={style}>
            {this.state.name}
          </button>
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
        width: "110px",
        height: "50px",
        fontWeight: "bold",
        border: "1px solid black",
        margin: ""
      };
      return (
        <td style = {style}>
          <button onClick={this.handleClick} style={style}>
            {this.state.name}
          </button>
        </td>
      );
    }
  }
}

export default Course;
