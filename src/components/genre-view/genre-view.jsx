import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import "./genre-view.scss";

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

        <Button
          variant="primary"
          onClick={() => {
            onBackClick();
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}

GenreView.propoTypes = {
  movie: propTypes.shape({
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
