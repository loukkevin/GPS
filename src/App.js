import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import Course from "./Components/Course";
import Elective from "./Components/Elective";
import PlanPage from "./Components/PlanPage";
import HTML5Backend from "react-dnd-html5-backend";
import { DragDropContext } from "react-dnd";

class App extends Component {
  constructor() {
    super();
    this.state = {
      requirements: [],
      electives: [],
      submitted: false,
      electivesChosen: false,
      url: "",
      api: "https://scsu-gps-server.herokuapp.com/parse?darsURL="
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  //used for grabbing the url from the text box
  handleChange(event) {
    this.setState({ url: event.target.value });
  }

  //handles submitting the DARS url
  handleSubmit(event) {
    event.preventDefault();
    let url = encodeURIComponent(this.state.url);
    let api = this.state.api;
    fetch(api + url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.setState({
          requirements: json.requirements,
          electives: json.electives,
          submitted: true
        });
      });
  }
  render() {
    return (
      <div>
        <PlanPage
          requirements={this.state.requirements}
          electives={this.state.electives}
        />
      </div>
    );
  }
  // render() {

  //   if (this.state.submitted && this.state.electives !== undefined && this.state.electives.length > 0){
  //   console.log(this.state.requirements)
  //   console.log(this.state.electives)
  //   let requirements = this.state.requirements
  //   let electives = this.state.electives

  //   const appStyle = {
  //     width: '99%',
  //     border: '2px solid black',
  //     margin: 'auto',
  //     padding: '5px'
  //   }

  //   const dividerStyle = {
  //     height: '5px'
  //   }
  //   return (
  //     <div className="App" style={appStyle}>
  //       <div>
  //         <h1>Electives</h1>
  //         {electives.map(elective => <div><Elective
  //           title={elective.title}
  //           courses={elective.electiveCourses}
  //           numCredits={elective.numOfCredits}
  //           numCourses={elective.numOfCourses} />
  //           <div style={dividerStyle}></div></div>)}
  //       </div>
  //     </div>
  //   );
  // }
  // else{
  //   const appStyle = {
  //     width: '1000px',
  //     border: '2px solid black',
  //     margin: 'auto'
  //   }
  //   const listStyle = {
  //     width: '400px',
  //     margin: 'auto',
  //     textAlign: 'left'
  //   }

  //   const spacerStyle = {
  //     height: '40px'
  //   }
  //   return (
  //     <div>
  //     <div style={spacerStyle}></div>
  //     <div className="App" style={appStyle}>
  //       <h1>Upload DARS</h1>
  //       <h4>Instructions:</h4>
  //       <ol style={listStyle}>
  //       <li>Login to the eServices website.</li>
  //       <li>Click "Grades and Transcripts".</li>
  //       <li>Click "Interactive Degree Audit Report".</li>
  //       <li>Follow the instructions displayed to open your DARS.</li>
  //       <li>Copy the URL of the DARS page.</li>
  //       <li>Paste the URL in the box below and click "Submit"</li>
  //       </ol>
  //       <div style={spacerStyle}></div>
  //       <form onSubmit={this.handleSubmit}>
  //       <label>
  //         DARS Url:
  //         <input type="text" value={this.state.url} onChange={this.handleChange} />
  //       </label>
  //       <input type="submit" value="Submit" />
  //     </form>
  //     <div style={spacerStyle}></div>
  //     </div>
  //     </div>
  //   );
  // }
  //}
}

let coursePosition = [0, 0];
let observer = null;

function emitChange() {
  observer(coursePosition);
}

export function observe(o) {
  if (observer) {
    throw new Error("Multiple observers not implemented.");
  }

  observer = o;
  emitChange();
}

export function moveCourse(toX, toY) {
  coursePosition = [toX, toY];
  emitChange();
}


export default DragDropContext(HTML5Backend)(App);
