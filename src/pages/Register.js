import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';

import UserContext from '../context/UserContext';
import axios from 'axios';
import ErrorNotice from '../components/ErrorNotice';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    password2: ''
  });

  const { userData, setUserData, setSpotifyAuth } = useContext(UserContext);
  const { username, password, password2 } = formData;
  const [error, setError] = useState();
  const history = useHistory();

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (password !== password2) {
      setError('passwords do not match');
    } else {
      try {
        await axios.post('http://localhost:3000/auth/register', formData);
        const loginRes = await axios.post('http://localhost:3000/auth/login', {
          username,
          password
        });
        // console.log(loginRes);
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data._id,
          recipes: loginRes.data.recipes
        });
        setSpotifyAuth(false);
        localStorage.setItem('auth-token', loginRes.data.token);
        history.push('/');
      } catch (err) {
        console.log(err);
        err && setError(err.message);
      }
    }
  };

  useEffect(() => {
    if (userData.user) history.push('/');
  });

  return (
    <div>
      <h1>Register</h1>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}

      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <label>Username</label>
        <input
          type='text'
          placeholder=''
          name='username'
          required
          value={username}
          onChange={(e) => onChange(e)}
        />
        <label>Password</label>
        <input
          type='password'
          placeholder=''
          required
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
          minLength='6'
        />
        <input
          type='password'
          placeholder='Confirm Password'
          required
          name='password2'
          value={password2}
          onChange={(e) => onChange(e)}
          minLength='6'
        />
        <input type='submit' value='Register' />
      </form>
      <p>
        Already have an account? <Link to='/login'>Login</Link>
      </p>
    </div>
  );
};

export default Register;
