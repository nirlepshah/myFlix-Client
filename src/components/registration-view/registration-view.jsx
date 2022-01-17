import React, { useState } from "react"; // import useState Hook
import propTypes from "prop-types"; //import propTypes
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

//Registration View Component
export function RegistrationView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  //method to handle Registration
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onRegistration(username); //allows  user to register default
  };

  return (
    <>
      {/* Add React Bootstrap Components  */}
      <Container fluid>
        <Navbar fixed="top" className="registrationnav">
          <Container>
            <Navbar.Brand href="#home">
              {" "}
              <h1> MyFlix </h1>{" "}
            </Navbar.Brand>

            <Nav className="me-auto"></Nav>
            <Nav.Link
              className="registerLink"
              tyle={{ color: "#EEB76B" }}
              href="#action1"
            >
              Login
            </Nav.Link>
          </Container>
        </Navbar>

        <div className="box"></div>

        <Row style={{ display: "flex", justifyContent: "center" }}>
          <Col xs={8} md={6} lg={4}>
            <CardGroup className="register-card">
              <Card>
                <Card.Body>
                  <Card.Title>Please register</Card.Title>

                  <Form>
                    <Form.Group>
                      <Form.Label> Username:</Form.Label>
                      <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                        placeholder="Enter Username"
                      />
                    </Form.Group>
                    <Form.Text className="text-muted">
                      *Username Required
                    </Form.Text>

                    <Form.Group>
                      <Form.Label> Password: </Form.Label>
                      <Form.Control
                        input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={8}
                        placeholder="Enter Password"
                      />
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
                      <Form.Text className="text-muted">
                        We'll never share your email with anyone else.
                      </Form.Text>
                    </Form.Group>

                    <Form.Group>
                      <Form.Label> Birthday </Form.Label>
                      <Form.Control
                        input
                        type="date"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        required
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
