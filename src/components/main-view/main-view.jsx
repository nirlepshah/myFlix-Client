import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import axios
 from 'axios';
export class MainView extends React.Component {
    constructor(){
        super(); //Adding state to the MainView Component
        this.state = {
            // Movie Array State
            movies:[],
                
           selectedMovie: null // Second State
        }
        
    }
    componentDidMount(){
axios.get('https://mymovieapp08.herokuapp.com/movies')
.then(response => {
  this.setState({
    movies: response.data
  })
})
.catch(error => {
  console.log(error)
})
    }
    setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }
  render() {
   // const { movies, selectedMovie } = this.state;
   


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