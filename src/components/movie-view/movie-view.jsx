import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import propTypes from "prop-types";
import { Link } from "react-router-dom";
import "./movie-view.scss";
import { Button } from "react-bootstrap";
//Component to be rendered when movie is selected
export class MovieView extends React.Component {
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
        <div className="movie-poster">
          <img src={movie.ImagePath} />
        </div>{" "}
        <br />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div>{" "}
        <br />
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div>{" "}
        <br />
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span>
          <br />
          <span className="label">Genre Description: </span>
          <span className="value">{movie.Genre.Description}</span>
        </div>
        <br />
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span>
          <br />
          <span className="label">Director Bio: </span>
          <span className="value">{movie.Director.Bio}</span>
        </div>{" "}
        <br />
        <div className="movie-id">
          <span className="label">MovieID: </span>
          <span className="value">{movie._id}</span>
        </div>{" "}
        <br />
        <Button
          onClick={() => {
            onBackClick(null);
            // window.history.back();
          }}
        >
          Back
        </Button>
      </div>
    );
  }
}
//propType defined for MovieView Component

MovieView.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
    _id: propTypes.string.isRequired,
    Description: propTypes.string.isRequired,
    ImagePath: propTypes.string.isRequired,
    Genre: propTypes.shape({
      Name: propTypes.string.isRequired,
      Description: propTypes.string.isRequired,
    }).isRequired,
    Director: propTypes.shape({
      Name: propTypes.string.isRequired,
      Bio: propTypes.string.isRequired,
    }),
  }).isRequired,
  onBackClick: propTypes.func.isRequired,
};
