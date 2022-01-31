import React from "react";
import { connect } from "react-redux";
import { setMovies } from "../../actions/actions";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { RegistrationView } from "../registration-view/registration-view";
import { LoginView } from "../login-view/login-view";

import MoviesList from "../movies-list/movies-list";
import { MovieView } from "../movie-view/movie-view";
import { Container, Row, Col } from "react-bootstrap"; // Import React Bootstrap Components
import "./main-view.scss";
import { DirectorView } from "../director-view/director-view";
import { GenreView } from "../genre-view/genre-view";
import { ProfileView } from "../profile-view/profile-view";
import { NavBar } from "../navbar-view/navbar-view";
import axios from "axios";

class MainView extends React.Component {
  constructor() {
    super(); //Adding state to the MainView Component

    this.state = {
      selectedMovie: null, // Second State
      user: null,
      register: null,
    };
  }

  getUsers(token) {
    axios
      .get("https://mymovieapp08.herokuapp.com/users", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          users: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //getMovies method using Axios to get list of movies from the movies endpoint
  getMovies(token) {
    axios
      .get("https://mymovieapp08.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.props.setMovies(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      this.getMovies(accessToken);
      this.getUsers(accessToken);
    }
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
  onLoggedIn(authData) {
    console.log(authData);
    this.setState({
      user: authData.user.Username,
    });
    localStorage.setItem("token", authData.token);
    localStorage.setItem("user", authData.user.Username);
    this.getMovies(authData.token);
  }

  onLoggedOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    this.setState({
      user: null,
    });
  }

  render() {
    const { user, users, register } = this.state;
    let { movies } = this.props;

    return (
      //Add React Bootstrap components
      <Router>
        <NavBar user={users} />
        <div className="main-view">
          <Row className="main-view justify-content-md-center">
            <Route
              exact
              path="/"
              render={() => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0)
                  return <div className="main-view"></div>;
                return <MoviesList movies={movies} />;
              }}
            />
            <Route
              path="/register"
              render={() => {
                if (user) return <Redirect to="/" />;
                return (
                  <Col>
                    <RegistrationView />
                  </Col>
                );
              }}
            />
            <Route
              path="/movies/:movieId"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;

                return (
                  <Col md={8}>
                    <MovieView
                      movie={movies.find((m) => m._id === match.params.movieId)}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/directors/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <DirectorView
                      movie={movies.find(
                        (m) => m.Director.Name === match.params.name
                      )}
                      onBackClick={() => history.goBack()}
                      movies={movies}
                    />
                  </Col>
                );
              }}
            />
            <Route
              path="/Genre/:name"
              render={({ match, history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col md={8}>
                    <GenreView
                      movie={movies.find(
                        (m) => m.Genre.Name === match.params.name
                      )}
                      onBackClick={() => history.goBack()}
                    />
                  </Col>
                );
              }}
            />

            <Route
              path={`/users/${user}`}
              render={({ history }) => {
                if (!user)
                  return (
                    <Col>
                      <LoginView onLoggedIn={(user) => this.onLoggedIn(user)} />
                    </Col>
                  );
                if (!user) return <Redirect to="/" />;
                if (movies.length === 0) return <div className="main-view" />;
                return (
                  <Col>
                    <ProfileView />
                  </Col>
                );
              }}
            />
          </Row>
        </div>
        <div className="main-view"></div>
      </Router>
    );
  }
}
let mapStateToProps = (state) => {
  return { movies: state.movies };
};

export default connect(mapStateToProps, { setMovies })(MainView);
