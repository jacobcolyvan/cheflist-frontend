// search bar, which searches through your recipes
// recipeslist
// Search controller on this page should search through presaved recipes

import React, { useEffect, useContext } from 'react';
import UserRecipes from '../components/UserRecipes';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import SpotifyAuth from '../components/SpotifyAuth';
import Loader from 'react-loader-spinner';

const Home = () => {
  const { userData, spotifyAuth } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push('/login');
  });

  return (
    <div>
      <h2>Saved Recipes</h2>
      <br />
      {!spotifyAuth && <SpotifyAuth />}
      {userData.recipes ? (
        <UserRecipes userRecipes={userData.recipes} />
      ) : (
        <div className='loader'>
          <Loader type='Puff' color='#00BFFF' height={100} width={100} />
        </div>
      )}
    </div>
  );
};

export default Home;
