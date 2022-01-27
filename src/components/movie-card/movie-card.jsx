import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";
//Import React Bootstrap Components
import { Button, Container, Row, Col, Card, CardGroup } from "react-bootstrap";
import { Card } from "react-bootstrap";
import "./movie-card.scss";

export class MovieCard extends React.Component {
  //Add React Bootstrap Components
  render() {
    const { movie, onMovieClick } = this.props;
    return (
      <div>
        <Container>
          <Row>
            <Col md={9}>
              <CardGroup>
                <Card bg="light" className="moviecard">
                  <Card.Img
                    variant="top"
                    src={movie.ImagePath}
                    style={{
                      objectFit: "cover",
                      height: "15rem",
                      width: "100%",
                      display: "block",
                    }}
                  />
                  <Card.Body>
                    <Card.Title className="cardTitle">{movie.Title}</Card.Title>
                    <Card.Text> {movie.Descripton} </Card.Text>

                    <Link to={`/movies/${movie._id}`}>
                      <Button
                        variant="link"
                        onClick={() => {
                          window.scroll(0, 0);
                        }}
                      >
                        Open
                      </Button>
                    </Link>
                    <Link to={`/directors/${movie.Director.Name}`}>
                      <Button variant="link">Director</Button>
                    </Link>
                    <Link to={`/genre/${movie.Genre.Name}`}>
                      <Button variant="link">Genre</Button>
                    </Link>
                  </Card.Body>
                </Card>
              </CardGroup>
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

//propType has been defined for MovieCard Component

MovieCard.propTypes = {
  movie: propTypes.shape({
    Title: propTypes.string.isRequired,
  }).isRequired,
};
