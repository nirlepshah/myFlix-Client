import React, { useState } from "react"; // import useState hook
import axios from "axios"; //import axios
import propTypes from "prop-types"; // import propType
//Import React Bootstrap Components
import {
  Form,
  FormGroup,
  CardGroup,
  Card,
  Col,
  Button,
  Row,
  Container,
  Nav,
  Navbar,
} from "react-bootstrap";
import { Button } from "react-bootstrap";
import "./login-view.scss";
import axios from "axios";

////Login View Component
export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameErr, setUsernameErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");

  const validate = () => {
    let isReq = true;
    if (!username) {
      setUsernameErr("Username required");
      isRequired = false;
      alert("Username is required");
    }
    if (!password) {
      setPasswordErr("Password is required");
      isReq = false;
      alert("Password is required");
    } else if (password.length < 4) {
      setPasswordErr("Password must be 8 characters long");
      isReq = false;
    }
    return isReq;
  };

  // method to hadle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    const isReq = validate();
    if (isReq) {
      //Send request to the server for authentication
      axios
        .post("https://mymovieapp08.herokuapp.com/login", {
          Username: username,
          Password: password,
        })
        .then((response) => {
          const data = response.data;
          props.onLoggedIn(data);
        })
        .catch((e) => {
          console.log("no such user");
          alert("No such user exist");
        });
    }
  };

  return (
    // Add React BootStrap Elements
    <div className="LoginContainer">
      <Container fluid>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col xs={8} md={6} lg={4}>
            <CardGroup className="LoginCard">
              <Card>
                <Card.Body>
                  <Card.Title>Login</Card.Title>

                  <Form>
                    <Form.Group>
                      <Form.Label> Username:</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Username"
                      />
                      {usernameErr && <p>{usernameErr}</p>}
                    </Form.Group>
                    <br />
                    <Form.Group>
                      <Form.Label> Password:</Form.Label>
                      <Form.Control
                        type="password"
                        // onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                        minLength={4}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      {passwordErr && <p>{passwordErr}</p>}
                    </Form.Group>
                    <br />
                    <Button
                      variant="primary"
                      type="submit"
                      onClick={handleSubmit}
                    >
                      Submit
                    </Button>
                  </Form>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
}
//propType defined for LoginView  Component
LoginView.propTypes = {
  onLoggedIn: propTypes.func.isRequired,
};
