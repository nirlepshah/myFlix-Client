import React from 'react';
import propTypes from 'prop-types';
//Component to be rendered when movie is selected 
export class MovieView extends React.Component {

    
  render() {
    const { movie, onBackClick } = this.props;

    return (
      <div className="movie-view">
          <div className="movie-poster"> 
          <img src={movie.ImagePath} />
         </div> <br />
        <div className="movie-title">
          <span className="label">Title: </span>
          <span className="value">{movie.Title}</span>
        </div> <br />
        <div className="movie-description">
          <span className="label">Description: </span>
          <span className="value">{movie.Description}</span>
        </div> <br />
        <div className="movie-genre">
          <span className="label">Genre: </span>
          <span className="value">{movie.Genre.Name}</span><br />
          <span className="label">Genre Description: </span>
          <span className="value">{movie.Genre.Description}</span>
        </div><br />
        <div className="movie-director">
          <span className="label">Director: </span>
          <span className="value">{movie.Director.Name}</span><br />
          <span className="label">Director Bio: </span>
          <span className="value">{movie.Director.Bio}</span>
        </div><br />
        <button onClick={() => { onBackClick(null);}}>Back</button>
       </div>
    );
  }
}
//propType defined for MovieView Component

MovieView.propTypes = {
   movies: propTypes.shape({
    Title: propTypes.string,
    Description: propTypes.string,
   
  }).isRequired,
  onBackClick: propTypes.func.isRequired
};