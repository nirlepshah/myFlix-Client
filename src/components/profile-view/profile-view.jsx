import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import propTypes from "prop-types";
import { Link } from "react-router-dom";

import axios from "axios";
//Component to be rendered when movie is selected
export class ProfileView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // users: [],
      movies: [],
    };
  }

  myFunction() {
    let x = localStorage.getItem("user");
    alert(x);
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
  componentDidMount() {
    let accessToken = localStorage.getItem("token");
    if (accessToken !== null) {
      this.setState({
        user: localStorage.getItem("user"),
      });
      // this.getUsers(accessToken);
      this.getMovies(accessToken);
      //   this.getUser(accessToken);
    }
  }

  render() {
    return (
      <>
        <div>
          <h1>Hi</h1>

          <button onClick={this.myFunction}>Back</button>
        </div>
        {/* <ul>
          {this.state.users.map((user) => (
            <li key={user._id}>{user.Username}</li>
          ))}
        </ul> */}
        <ul>
          {this.state.movies.map((movie) => (
            <li key={movie._id}>{movie.Title}</li>
          ))}
        </ul>
      </>
    );
  }
}
