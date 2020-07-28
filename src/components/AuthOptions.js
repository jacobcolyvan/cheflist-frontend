import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import UserContext from '../context/UserContext';

const AuthOptions = () => {
  const { userData, setUserData } = useContext(UserContext);

  const history = useHistory();

  const register = () => history.push('/register');
  const login = () => history.push('/login');
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };
  return (
    <div className='auth-options'>
      {userData.user && (
        <button className='logout' onClick={logout}>
          Log out
        </button>
      )}
    </div>
  );
};

export default AuthOptions;
