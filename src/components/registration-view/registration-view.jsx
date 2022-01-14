import React, { useState } from 'react'; // import useState Hook
import propTypes from 'prop-types'; //import propTypes

//Registration View Component
export function RegistrationView(props) {
  const [ username, setUsername ] = useState('');
  const [ password, setPassword ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ birthday, setBirthday] = useState('');

  //method to handle Registration 
  const handleRegister = (e) => {
    e.preventDefault();
    console.log(username, password);
     props.onRegistration(username); //allows  user to register default
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
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
      Birthday:
        <input type="date" value={birthday} onChange={e => setBirthday(e.target.value)} />
      </label>
      <button type="submit" onClick={handleRegister}>Register</button>
    </form>
  );
}

//propType defined for RegistrationView Component
RegistrationView.propTypes = {
  register: propTypes.shape({
    username: propTypes.string,
    password: propTypes.string,
    email:propTypes.string,
    date:propTypes.date,
  }).isRequired,
  onRegistration: propTypes.func.isRequired,
};