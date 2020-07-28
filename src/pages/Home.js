import React, { useEffect, useContext, useState } from 'react';
import UserRecipeTile from '../components/UserRecipeTile';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import SpotifyAuth from '../components/SpotifyAuth';
import Loader from 'react-loader-spinner';
import '../styles/UserRecipeTile.css';
import { v4 as uuidv4 } from 'uuid';

const Home = () => {
  const { userData, spotifyAuth } = useContext(UserContext);
  const history = useHistory();
  // const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (!userData.user) history.push('/login');
  });

  return (
    <div>
      <h2>Saved Recipes</h2>
      <br />

      {!spotifyAuth && <SpotifyAuth />}

      {userData.recipes ? (
        <div className='userRecipeTile'>
          {userData.recipes.map((recipe, index) => (
            <UserRecipeTile recipe={recipe} index={index} key={uuidv4()} />
          ))}
        </div>
      ) : (
        <div className='loader'>
          <Loader type='Puff' color='#00BFFF' height={100} width={100} />
        </div>
      )}

      {/* {offset > 0 && <button>Back</button>}
      <button>Next</button> */}
    </div>
  );
};

export default Home;

// index = index + offset (for :id in url)
