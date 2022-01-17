import React, { useState } from "react"; // import useState hook
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

////Login View Component
export function LoginView(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // method to hadle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username); // allows  user to be automatically log in
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
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter Username"
                      />
                    </Form.Group>
                    <br />
                    <Form.Group>
                      <Form.Label> Password:</Form.Label>
                      <Form.Control
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter Password"
                      />
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
