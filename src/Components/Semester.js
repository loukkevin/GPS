import React, { Component } from 'react';
import Course from './Course';
import styles from './elective.css';

class Elective extends Component{
    constructor(props){
      super(props);
      let type = "";
      if (this.props.numCredits > 0){
        type = "credit";
      }else {
        type = "course";
      }
    this.selectCourseHandler = this.selectCourseHandler.bind(this)
      this.state = {
        title: this.props.title,
        courses: this.props.courses,
        numCredits: this.props.numCredits,
        numCourses: this.props.numCourses,
        fulfilled: false,
        numSelected: 0,
        electiveType: type
      }
    }

  selectCourseHandler(credits,selected){
      console.log("in Handler")
      if (this.state.electiveType == "credit"){
        if (selected){
          this.setState({numSelected: (this.state.numSelected + credits)})
        }else {
          this.setState({numSelected: (this.state.numSelected - credits)})
        }
      }else {
        if (selected){
          this.setState({numSelected: (this.state.numSelected + 1)})
        }else {
          this.setState({numSelected: (this.state.numSelected - 1)})
        }
      }
      if (this.state.electiveType === "credit"){
       if (this.state.numSelected >= this.state.numCredits){
         this.setState({fulfilled: true});
       }else {
         this.setState({fulfilled: false});
       }
      }else {
        if (this.state.numSelected >= this.state.numCourses){
          this.setState({fulfilled: true});
        }else {
          this.setState({fulfilled: false});
        }
      }
    }



  render(){
    return (
      <td>Semester Component</td>
    )
)}
}
}

export default Elective;
