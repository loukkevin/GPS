import React, { Component } from "react";
import "./App.css";
import Elective from "./Components/Elective";
import PlanPage from "./Components/PlanPage";

class App extends Component {
  constructor() {
    super();
    this.state = {
      requirements: [],
      electives: [],
      coursesTaken: [],
      coursesSelected: [],
      submitted: false,
      electivesChosen: false,
      url: "",
      api: "https://scsu-gps-server.herokuapp.com/parse?darsURL=" //"http://localhost:8080/parse?darsURL=" //
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.openPlanPage = this.openPlanPage.bind(this);
    this.updateCourses = this.updateCourses.bind(this);
  }

  //used for grabbing the url from the text box
  handleChange(event) {
    this.setState({ url: event.target.value });
  }

  updateCourses(course, selected) {
    if (!selected) {
      let courses = this.state.coursesSelected;
      if (courses === undefined) {
        courses = [];
      }
      console.log("courses -->" + courses + "<-- courses");
      courses.push({
        name: course,
        key: course
      });
      console.log("after push attempt: courses -->" + courses + "<-- courses");
      this.setState({ coursesSelected: courses });
    } else {
      var courses = this.state.coursesSelected;
      var courseName = "";
      for (var index = 0; index < courses.length; index++) {
        courseName = courses[index].name;
        if (courseName === course) {
          courses.splice(index, 1);
          this.setState({ coursesSelected: courses });
        }
      }
    }
    console.log("in updateCourses");
    // this.setState({
    //   coursesSelected: courses
    // });
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
          coursesTaken: json.coursesTaken,
          submitted: true
        });
      });
  }

  openPlanPage() {
    console.log(
      "Here is where the plan page should open" + this.state.electivesChosen
    );
    this.setState({ electivesChosen: true });
    console.log(this.state.coursesSelected);
  }

  render() {

    if (this.state.electivesChosen) {
      let courses = this.state.coursesSelected;
      console.log("coursesSelected" + courses);
      return (
        <div>
          <PlanPage
            requirements={this.state.requirements}
            electiveCourses={courses}
          />
        </div>
      );
    } else {
      if (
        this.state.submitted &&
        this.state.electives !== undefined &&
        this.state.electives.length > 0
      ) {
        console.log(this.state.requirements);
        console.log(this.state.electives);
        let requirements = this.state.requirements;
        let electives = this.state.electives;

        const appStyle = {
          width: "99%",
          border: "2px solid black",
          margin: "auto",
          padding: "5px"
        };

        const dividerStyle = {
          height: "5px"
        };
        return (
          <div className="App" style={appStyle}>
            <div>
              <h1>Electives</h1>
              {electives.map(elective => (
                <div>
                  <Elective
                    title={elective.title}
                    courses={elective.electiveCourses}
                    numCredits={elective.numOfCredits}
                    numCourses={elective.numOfCourses}
                    updateCourses={this.updateCourses}
                  />
                  <div style={dividerStyle} />
                </div>
              ))}
              <div>
                <button onClick={this.openPlanPage}>Continue To Plan</button>
              </div>
            </div>
          </div>
        );
      } else {
        //at this point electives is null or empty or the DARS has not been submitted
        const appStyle = {
          width: "1000px",
          border: "2px solid black",
          margin: "auto"
        };
        const listStyle = {
          width: "400px",
          margin: "auto",
          textAlign: "left"
        };

        const spacerStyle = {
          height: "40px"
        };

        if (
          this.state.submitted &&
          this.state.requirements !== undefined &&
          this.state.requirements.length > 0
        ) {
          return (
            <div>
              <div>
                <p>
                  The system did not detect any elective requirements that were
                  unfulfilled. If you believe this is incorrect, please contact{" "}
                  <strong>someone who can fix the problem</strong>.
                </p>
              </div>
              <div>
                <button onClick={this.openPlanPage}>Continue to Plan</button>
              </div>
            </div>
          );
        } else if (this.state.submitted && !this.state.electivesChosen) {
          <div>
            <div>
              <p>
                The system did not detect any requirements that were
                unfulfilled. If you believe this is incorrect, please contact{" "}
                <strong>someone who can fix the problem</strong>.
              </p>
            </div>
          </div>;
        } else {
          return (
            <div>
              <div style={spacerStyle} />
              <div className="App" style={appStyle}>
                <h1>Upload DARS</h1>
                <h4>Instructions:</h4>
                <ol style={listStyle}>
                  <li>Login to the eServices website.</li>
                  <li>Click "Grades and Transcripts".</li>
                  <li>Click "Interactive Degree Audit Report".</li>
                  <li>Follow the instructions displayed to open your DARS.</li>
                  <li>Copy the URL of the DARS page.</li>
                  <li>Paste the URL in the box below and click "Submit"</li>
                </ol>
                <div style={spacerStyle} />
                <form onSubmit={this.handleSubmit}>
                  <label>
                    DARS Url:
                    <input
                      type="text"
                      value={this.state.url}
                      onChange={this.handleChange}
                    />
                  </label>
                  <input type="submit" value="Submit" />
                </form>
                <div style={spacerStyle} />
              </div>
            </div>
          );
        }
      }
    }
  }
}

export default App;
