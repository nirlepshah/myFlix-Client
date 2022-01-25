import React, { useState } from "react"; // import useState Hook
import axios from "axios";
import propTypes from "prop-types"; //import propTypes
import { Link } from "react-router-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { LoginView } from "../login-view/login-view";
import { MainView } from "../main-view/main-view";

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
import "./registration-view.scss";
import { LoginView } from "../login-view/login-view";

//Registration View Component
export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");
  //useState hook required for the validatons
  const [values, setValues] = useState({
    usernameErr: "",
    passwordErr: "",
    emailErr: "",
  });

  const validate = () => {
    let isReq = true;
    if (!username) {
      setValues({ ...values, usernameErr: "Username is Required" });
      isReq = false;
    } else if (username.length < 5) {
      setValues({
        ...values,
        usernameErr: "Username must be 5 characters long",
      });
      isReq = false;
    }
    if (!password) {
      setValues({ ...values, passwordErr: "Password Required" });
      isReq = false;
    } else if (password.length < 6) {
      setValues({
        ...values,
        passwordErr: "Password must be 6 characters long",
      });
      isReq = false;
      if (!email) {
        setValues({ ...values, emailErr: "Email required" });
      }
      isReq = false;
    } else if (email.indexOf("@") === -1) {
      setValues({ ...values, emailErr: "Email is invalid" });
      isReq = false;
    }
    return isReq;
  };

  //method to handle Registration
  const handleRegister = (e) => {
    e.preventDefault();
    //  console.log(username, password);
    const isReq = validate();
    if (isReq) {
      axios
        .post("http://mymovieapp08.herokuapp.com/users", {
          Username: username,
          Password: password,
          Email: email,
          Birthday: birthday,
        })
        .then((response) => {
          const data = response.data;
          console.log(data);
          alert("Registration successful, please login");
          // window.open("/", "_self");
        })
        .catch((response) => {
          console.response(response);
          alert("unable to register");
        });
      <LoginView />;
      // props.onRegistration(username); //allows  user to register default
    }
  };

  return (
    <>
      {/* Add React Bootstrap Components  */}
      <Container fluid>
        {/* <Navbar fixed="top" className="registrationnav">
          <Container>
            <Navbar.Brand href="#home">
              {" "}
              <h1> MyFlix </h1>{" "}
            </Navbar.Brand>

            {/* <Nav className="me-auto"></Nav>
            <Nav.Link
              className="registerLink"
              tyle={{ color: "#EEB76B" }}
              href="#action1"
            >
              Login
            </Nav.Link> */}
        {/* </Container>
        </Navbar> */}{" "}
        <div className="box"></div>
        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col xs={8} md={6} lg={6}>
            <CardGroup className="register-card">
              <Card>
                <Card.Body>
                  <Card.Title>Please register</Card.Title>

                  <Form>
                    <Form.Group>
                      <Form.Label> Username:</Form.Label>
                      <Form.Control
                        input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        // minLength={6}
                        placeholder="Enter Username"
                      />
                      {values.usernameErr && <p>{values.usernameErr}</p>}
                    </Form.Group>
                    {/* <Form.Text className="text-muted">
                      *Min 5 characters Username Required
                    </Form.Text> */}

                    <Form.Group>
                      <Form.Label> Password: </Form.Label>
                      <Form.Control
                        input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        // required
                        // minLength={6}
                        placeholder="Enter Password"
                      />
                      {values.passwordErr && <p>{values.passwordErr}</p>}
                    </Form.Group>

                    <Form.Group>
                      <Form.Label> Email:</Form.Label>
                      <Form.Control
                        input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter Email address"
                      />
                      {values.emailErr && <p>{values.emailErr}</p>}
                      {/* <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text> */}
                    </Form.Group>

                    <Form.Group>
                      <Form.Label> Birthday </Form.Label>
                      <Form.Control
                        input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        // required
                      />
                    </Form.Group>

                    <br />
                    <Button
                      className="registerbtn"
                      variant="primary"
                      type="submit"
                      onClick={handleRegister}
                    >
                      Register
                    </Button>
                    <p></p>
                    <p>
                      Already registered <Link to={"/"}>Sign In</Link> here{" "}
                    </p>
                  </Form>
                </Card.Body>
              </Card>
            </CardGroup>
          </Col>
        </Row>
      </Container>
      <div className="footer"></div>
    </>
  );
}

//propType defined for RegistrationView Component
RegistrationView.propTypes = {
  onRegistration: propTypes.func.isRequired,
};
