import React from 'react';
import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

import axios from 'axios';

export class MainView extends React.Component {
    constructor(){
        super(); //Adding state to the MainView Component
        this.state = {
            // Movie Array State
            movies:[],
            selectedMovie: null, // Second State
            user: null
        }
        
    }
    // Use of Axios to fetch movies from API server's /movies endpoint 
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
    
    // When movie is clicked, selectedMovie property in the state is updated to particular movie   
    setSelectedMovie(newSelectedMovie) {
        this.setState({
          selectedMovie: newSelectedMovie
        });
      }
      // when user logs in, user property in the state is updated to particular user
      onLoggedIn(user) {
        this.setState({
          user
        });
      }
      // when user registers
      // onRegistration(register) {
      //   this.setState({
      //     register,
      //   });
      // }

  render() {
   const { movies, selectedMovie } = this.state;
   // if there is no user login view is rendered
    // if (!user) return <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
  
   // Blank page before movies are loaded
   if (movies.length === 0) return <div className="main-view" />
   
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