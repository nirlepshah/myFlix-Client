import React from "react";
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";
import { MovieCard } from "../movie-card/movie-card";
import { MovieView } from "../movie-view/movie-view";
import { Container, Row, Col } from "react-bootstrap"; // Import React Bootstrap Components
import "./main-view.scss";

import axios from "axios";

export class MainView extends React.Component {
  constructor() {
    super(); //Adding state to the MainView Component

    this.state = {
      // Movie Array State
      movies: [],
      selectedMovie: null, // Second State
      user: null,
      register: null,
    };
  }

  // Axios to fetch movies from server API /movies endpoint
  componentDidMount() {
    axios
      .get("https://mymovieapp08.herokuapp.com/movies")
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  // When movie is clicked, selectedMovie property in the state is updated to particular movie
  setSelectedMovie(newSelectedMovie) {
    this.setState({
      selectedMovie: newSelectedMovie,
    });
  }

  //  when user registers register property in the state is updated
  onRegistration(register) {
    this.setState({
      register,
    });
  }

  //  when user logs in, user property in the state is updated to particular user
  onLoggedIn(user) {
    this.setState({
      user,
    });
  }

  render() {
    const { movies, selectedMovie, user, register } = this.state;

    //Register view is rendered
    if (!register)
      return (
        <RegistrationView
          onRegistration={(register) => this.onRegistration(register)}
        />
      );

    // if there is no user login view is rendered

    if (!user)
      return <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />;

    // Blank page before movies are loaded
    if (movies.length === 0) return <div className="main-view" />;

    return (
      //Add React Bootstrap components

      <div className="main-view">
        <Row className="main-view justify-content-md-center">
          {selectedMovie ? (
            <Row className="justify-content-md-center">
              {" "}
              <Col md={8}>
                {" "}
                <MovieView
                  movie={selectedMovie}
                  onBackClick={(newSelectedMovie) => {
                    this.setSelectedMovie(newSelectedMovie);
                  }}
                />{" "}
              </Col>{" "}
            </Row>
          ) : (
            <Row className="justify-content-md-center">
              {movies.map((movie) => (
                <Col md={3}>
                  <MovieCard
                    key={movie._id}
                    movie={movie}
                    onMovieClick={(movie) => {
                      this.setSelectedMovie(movie);
                      window.scroll(0, 0); //method to scroll windows to top
                    }}
                  />
                </Col>
              ))}
            </Row>
          )}
        </Row>
      </div>
    );
  }
}
