import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
export class MainView extends React.Component {
    constructor(){
        super(); //Adding state to the MainView Component
        this.state = {
            // Movie Array State
            movies:[
                { _id:"61c9550c8ecc8b1b59e89555", Title:"The Shawshank Redemption", Description:"Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.", ImagePath: "../img/img1.jpg", Genre:"Drama", Director:"Frank Darabont"},
                { _id:"61c955188ecc8b1b59e89556", Title:"The Godfather", Description:"The Godfather follows Vito Corleone, Don of the Corleone family, as he passes the mantel to his unwilling son, Michael.", ImagePath:"../img/img2.jpg",Genre:"Crime", Director:"Francis Ford Coppola"},
                { _id:"61c955248ecc8b1b59e89557", Title:"Spirited Away", Description:"During her family's move to the suburbs, a sullen 10-year-old girl wanders into a world ruled by gods, witches, and spirits, and where humans are changed into beasts.", ImagePath:"../img/img3.jpg",Genre:"Animation", Director:"Hayao Miyazaki"}
            ],
            selectedMovie: null // Second State
        }
        
    }
    setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }
  render() {
    const { movies, selectedMovie } = this.state;

    if (selectedMovie) return <MovieView movie={selectedMovie} />;

  if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

  return (
    <div className="main-view">
           
           {selectedMovie
        ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }}/>
             : movies.map(movie => (
          <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }}/>
        ))
      }
    </div>
  );
  }
}