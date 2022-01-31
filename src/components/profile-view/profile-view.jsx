import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

import {
  Button,
  Card,
  Container,
  CardDeck,
  Form,
  Row,
  Col,
} from "react-bootstrap";
import { MovieCard } from "../movie-card/movie-card";
import "./profile-view.scss";
import axios from "axios";

export class ProfileView extends React.Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      Username: null,
      Password: null,
      Email: null,
      Birthday: null,
      FavouriteMovies: [],
      validated: null,
    };
  }
  //Get users data
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

  //get movies data
  getMovies(token) {
    axios
      .get("https://mymovieapp08.herokuapp.com/movies", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          movies: response.data,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //get data of looged in user
  getUser(token) {
    const user = localStorage.getItem("user");
    axios
      .get(`https://mymovieapp08.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
          FavouriteMovies: response.data.FavouriteMovies,
        });
      })
      .catch(function (error) {
        console.log(error);
      });
  }
  //ComponentDid Mount method
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });

      this.getMovies(accessToken);
      this.getUser(accessToken);
    }
  }

  // Remove Favourite Movie

  removeFavourite(e, movie) {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(
        `https://mymovieapp08.herokuapp.com/users/${user}/movies/${movie._id}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      )
      .then((response) => {
        console.log(response);
        alert("Movie was removed");
        this.componentDidMount();
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  //Edit User Data
  editUser(e, newUsername, newPassword, newEmail, newBirthday) {
    e.preventDefault();
    this.setState({
      validated: null,
    });

    const form = e.currentTarget;
    if (form.checkValidity() === false) {
      e.preventDefault();
      e.stopPropagation();
      this.setState({
        validated: true,
      });
      return;
    }

    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");

    axios
      .put(
        `https://mymovieapp08.herokuapp.com/users/${user}`,
        {
          Username: newUsername ? newUsername : this.state.Username,
          Password: newPassword ? newPassword : this.state.Password,
          Email: newEmail ? newEmail : this.state.Email,
          Birthday: newBirthday ? newBirthday : this.state.Birthday,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        alert("Saved Changes");
        this.setState({
          Username: response.data.Username,
          Password: response.data.Password,
          Email: response.data.Email,
          Birthday: response.data.Birthday,
        });
        localStorage.setItem("user", this.state.Username);
        window.open(`/users/${user}`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
    console.log(Username);
    console.log(Password);
    console.log(Email);
    console.log(Birthday);
  }

  //Delete User Method

  deleteUser() {
    const user = localStorage.getItem("user");
    const token = localStorage.getItem("token");

    axios
      .delete(`https://mymovieapp08.herokuapp.com/users/${user}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
        alert("Profile has been deleted!");
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        window.open(`/`, "_self");
      })
      .catch(function (error) {
        console.log(error);
      });
  }

  setUsername(input) {
    this.Username = input;
  }

  setPassword(input) {
    this.Password = input;
  }

  setEmail(input) {
    this.Email = input;
  }

  setBirthday(input) {
    this.Birthday = input;
  }

  render() {
    const {
      FavouriteMovies,
      validated,
      Username,
      Password,
      Email,
      Birthday,
      movies,
    } = this.state;

    return (
      <>
        <Container fluid>
          <Row className="profile-view">
            <Card className="profile-card">
              <Col>
                <h4
                  style={{
                    color: "black",
                    fontStyle: "Italic",
                  }}
                >
                  Username:{`${this.state.Username}`}
                </h4>
                <p>Email: {`${this.state.Email}`}</p>
                <p>Birthday: {`${this.state.Birthday}`}</p>
                <p>Favourite Movies ID: {`${this.state.FavouriteMovies}`}</p>
              </Col>
              <Col>
                <h3
                  style={{
                    color: "black",
                    fontStyle: "Italic",
                  }}
                  className="section"
                >
                  Update Profile
                </h3>
                <Card.Body>
                  <Form
                    noValidate
                    validated={validated}
                    className="update-form"
                    onSubmit={(e) =>
                      this.editUser(
                        e,
                        this.Username,
                        this.Password,
                        this.Email,
                        this.Birthday
                      )
                    }
                  >
                    <Form.Group controlId="formBasicUsername">
                      <Form.Label className="form-label">Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Change Username"
                        onChange={(e) => this.setUsername(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label className="form-label">
                        Username<span className="required">*</span>
                      </Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="New Password"
                        onChange={(e) => this.setPassword(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                      <Form.Label className="form-label">Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Change Email"
                        onChange={(e) => this.setEmail(e.target.value)}
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicBirthday">
                      <Form.Label className="form-label">Birthday</Form.Label>
                      <Form.Control
                        type="date"
                        placeholder="Change Birthday"
                        onChange={(e) => this.setBirthday(e.target.value)}
                      />
                    </Form.Group>
                    <br />
                    <Button variant="danger" type="submit">
                      Update
                    </Button>
                    <br />
                    <br />
                    <Button
                      className="delete-button"
                      variant="danger"
                      onClick={() => this.deleteUser()}
                    >
                      {" "}
                      Delete User{" "}
                    </Button>
                  </Form>
                </Card.Body>
              </Col>
            </Card>
          </Row>

          <br />
          {FavouriteMovies.length > 0 &&
            movies.map((movie) => {
              if (
                movie._id === FavouriteMovies.find((fav) => fav === movie._id)
              ) {
                return (
                  <Card className="favorite-movie" key={movie._id}>
                    <h2
                      style={{
                        color: "black",
                        fontStyle: "Italic",
                      }}
                    >
                      Favourite Movies:
                    </h2>
                    <Card.Img
                      className="fav-poster"
                      variant="top"
                      style={{
                        objectFit: "cover",
                        height: "40rem",
                        width: "30em",
                        display: "block",
                      }}
                      src={movie.ImagePath}
                    />
                    <Card.Body style={{ backgroundColor: "white" }}>
                      <Card.Title className="movie_title">
                        {movie.Title}
                      </Card.Title>
                      <Button
                        size="sm"
                        variant="danger"
                        value={movie._id}
                        onClick={(e) => this.removeFavourite(e, movie)}
                      >
                        {" "}
                        Remove{" "}
                      </Button>
                    </Card.Body>
                  </Card>
                );
              }
            })}
        </Container>
        <br />
        <Button
          onClick={() => {
            window.history.back();
          }}
        >
          Back
        </Button>
      </>
    );
  }
}

ProfileView.propTypes = {
  users: propTypes.shape({
    Username: propTypes.string.isRequired,
    Email: propTypes.string.isRequired,
    Birthday: propTypes.string,
    FavouriteMovies: propTypes.arrayOf(
      propTypes.shape({
        _id: propTypes.string.isRequired,
      })
    ),
  }),
};
