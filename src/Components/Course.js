import React, { Component } from "react";
import Draggable from "react-draggable";
import { DragSource } from "react-dnd";

const courseSource = {
  beginDrag(props) {
    return {};
  }
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

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
    // let api =
    //   "https://scsu-gps-server.herokuapp.com/getCourseInformation?name= ";
    // fetch(api + this.state.name)
    //   .then(response => {
    //     return response.json();
    //   })
    //   .then(json => {
    //     this.setState({
    //       prerequisites: json.prerequisites,
    //       credits: json.credits,
    //       description: json.description,
    //       semestersOffered: json.semestersOffered
    //     });
    //   });
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
        fontSize: "16px",
        border: "1px solid black",
        width: "103px",
        height: "50px",
        fontWeight: "bold"
      };
      return (
        <Draggable
          disabled={this.props.disabled}
          onStart={this.handleStart}
          onDrag={this.handleDrag}
          onStop={this.handleDrop}
        >
          <button onClick={this.handleClick} style={style}>
            {this.state.name}
          </button>
        </Draggable>
      );
    } else {
      const style = {
        backgroundColor: "white",
        color: "black",
        textAlign: "center",
        textDecoration: "none",
        display: "inline-block",
        fontSize: "16px",
        width: "103px",
        height: "50px",
        fontWeight: "bold",
        border: "1px solid black"
      };
      //     return (
      //       <Draggable disabled={this.props.disabled}>
      //         <button onClick={this.handleClick} style={style}>
      //           {this.state.name}
      //         </button>
      //       </Draggable>
      //     );
      const { connectDragSource, isDragging } = this.props;
      return connectDragSource(
        <td
          style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: "bold",
            cursor: "move",
            width: "103px",
            height: "50px",
            textAlign: "center"
          }}
        >
          <button onClick={this.handleClick} style={style}>
            {this.state.name}
          </button>
        </td>
      );
    }
  }
}

export default DragSource("course", courseSource, collect)(Course);
