import React from "react"; // Import React object from react module
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ReactDOM from "react-dom"; // Import ReactDOM object from react-dom module
import { MainView } from "./components/main-view/main-view";
import { MovieView } from "./components/movie-view/movie-view";

// Importing ./index.scss`
import "./index.scss";
import { Container } from "react-bootstrap";

// Main component
class MyFlix extends React.Component {
  render() {
    return (
      <Container>
        <MainView />
      </Container>
    );
  }
}

// Finds the root of app from index.html
const container = document.getElementsByClassName("app-container")[0];

// Tells ReactDOM object to render app in the root DOM element using render method
ReactDOM.render(React.createElement(MyFlix), container);
