// Import React and the Component class to create a class-based component
import React, { Component } from "react";

// Main App component (class-based)
class App extends Component {
  constructor(props) {
    super(props);

    // Initial state of the component
    this.state = {
      // Person object containing profile information
      Person: {
        fullName: "david goggins",
        bio: "is a former Navy SEAL and endurance athlete known for his extreme mental toughness and relentless self-discipline.",
        imgSrc: "pic1.jpg",
        profession: "athlete",
      },
      // Boolean to control showing / hiding the profile
      shows: false,
      // Counter to track time since the profile was last mounted (shown)
      timeSinceMounted: 0,
    };
  }

  // Lifecycle method: called once when the component is mounted
  componentDidMount() {
    // The profile is hidden initially, so the timer is not started here
  }

  // Lifecycle method: called just before the component is destroyed
  componentWillUnmount() {
    // Clear the interval to avoid memory leaks
    clearInterval(this.interval);
  }

  // Starts the timer and updates the counter every second
  startTimer = () => {
    this.interval = setInterval(() => {
      this.setState((prev) => ({
        timeSinceMounted: prev.timeSinceMounted + 1,
      }));
    }, 1000);
  };

  // Stops the timer
  stopTimer = () => {
    clearInterval(this.interval);
  };

  // Toggles the visibility of the profile
  toggleShow = () => {
    // Stop any running timer before updating the state
    this.stopTimer();

    this.setState(
      (prev) => ({
        // Toggle show / hide
        shows: !prev.shows,
        // Reset timer whenever the profile is toggled
        timeSinceMounted: 0,
      }),
      () => {
        // Callback runs after state update
        // Start the timer ONLY when the profile is shown
        if (this.state.shows) {
          this.startTimer();
        }
      }
    );
  };
  render() {
    // Destructure state values for cleaner JSX
    const { Person, shows, timeSinceMounted } = this.state;

    return (
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        {/* Button to toggle profile visibility */}
        <button onClick={this.toggleShow}>
          {shows ? "Hide Profile" : "Show Profile"}
        </button>

        {/* Conditional rendering: profile appears only if shows is true */}
        {shows && (
          <div>
            <img src={Person.imgSrc} alt="profile" />
            <h2>{Person.fullName}</h2>
            <h4>{Person.profession}</h4>
            <p>{Person.bio}</p>

            {/* Display time since the profile was last shown */}
            <p>Time since last mount: {timeSinceMounted} seconds</p>
          </div>
        )}
      </div>
    );
  }
}

// Export the App component
export default App;