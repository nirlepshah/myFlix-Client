import React, { useState } from 'react'; // import useState hook
import propTypes from 'prop-types'; // import propType
////Login View Component
export function LoginView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');

  // method to hadle submit
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password);
    props.onLoggedIn(username); // allows  user to be automatically log in
  };
  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Submit</button>
    </form>
  );
  
}
//propType defined for LoginView  Component
LoginView.propTypes = {
  user: propTypes.shape({
    username: propTypes.string,
    password: propTypes.string
  }).isRequired,
  onLoggedIn: propTypes.func.isRequired,
};