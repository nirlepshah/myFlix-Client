import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

export class GenreView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;
    return (
      <div className="genre-view">
        <p>
          {" "}
          <b>Genre: </b> {movie.Genre.Name}
        </p>
        <p>
          <b>Genre Description: </b>
          {movie.Genre.Description}
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
