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

  componentDidMount(){
        
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

  componentWillReceiveProps(props){
    if (props.courseAdded){
      this.setState({isToggleOn: false});
    } 
  }

  deselectCourse(){
    this.setState({isToggleOn: false});
  }

  handleClick() {
    this.setState(prevState => ({
      isToggleOn: !prevState.isToggleOn
    }));
    if (this.isSelected()) {
      this.props.selectCourseHandler(this, true);
    } else {
      this.props.selectCourseHandler(this, false);
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
