import React, { useState, useContext, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';
import axios from 'axios';
import ErrorNotice from '../components/ErrorNotice';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState('');
  const { userData, setUserData, setSpotifyAuth } = useContext(UserContext);
  const history = useHistory();
  const { username, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginRes = await axios.post(
        'http://localhost:3000/auth/login',
        formData
      );
      // console.log(loginRes);
      setUserData({
        token: loginRes.data.token,
        user: loginRes.data._id,
        recipes: loginRes.data.recipes
      });
      localStorage.setItem('auth-token', loginRes.data.token);

      if (loginRes.data.spotifyAuth) {
        await axios
          .post(
            'http://localhost:3000/spotify/refresh',
            {
              id: loginRes.data._id
            },
            {
              headers: {
                'Content-Type': 'application/json',
                'x-auth-token': loginRes.data.token
              }
            }
          )
          .then((data) => {
            setSpotifyAuth(data.data.access_token);
            console.log('access_token added');
            history.push('/');
          });
      }
    } catch (err) {
      console.log(err);
      err && setError(err.message);
    }
  };

  useEffect(() => {
    if (userData.user) history.push('/');
  });

  return (
    <div>
      <h1>Sign In</h1>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form onSubmit={(e) => onSubmit(e)} className='form'>
        <label>Username</label>
        <input
          type='text'
          placeholder='Username'
          name='username'
          required
          value={username}
          onChange={(e) => onChange(e)}
        />
        <label>Password</label>
        <input
          type='password'
          placeholder='Password'
          required
          name='password'
          value={password}
          onChange={(e) => onChange(e)}
          minLength='6'
        />

        <input type='submit' value='Login' />
      </form>
      <p>
        Don't have an account? <Link to='/register'>Sign up</Link>
      </p>
    </div>
  );
};

export default LoginForm;
