import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
export class DirectorView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    let date = new Date(movie.Director.Birth);

    return (
      <div className="director-view">
        <p>
          {" "}
          <b>Director Name:</b> {movie.Director.Name}
        </p>
        <p>
          <b>Bio:</b> {movie.Director.Bio}
        </p>
        <p>
          <b>Birth Day:</b> {date.toISOString().split("T")[0]}
        </p>
        <button
          onClick={() => {
            window.history.back();
          }}
        >
          Back
        </button>
      </div>
    );
  }
}
