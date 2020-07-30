import React, { useEffect, useContext, useState } from 'react';
import UserRecipeTile from '../components/UserRecipeTile';
import UserContext from '../context/UserContext';
import { useHistory } from 'react-router-dom';
import SpotifyAuth from '../components/SpotifyAuth';
import '../styles/UserRecipeTile.css';
import { v4 as uuidv4 } from 'uuid';

// This
const Home = () => {
  const { userData, spotifyAuth, recipeArray } = useContext(UserContext);
  const history = useHistory();
  const [page, setPage] = useState(0);

  useEffect(() => {
    if (!userData.user) history.push('/login');
  });

  return (
    <div>
      <h2>Saved Recipes</h2>
      <br />
      <p>
        Because music and food are better when together: <i>Cheflist.</i>
      </p>
      {!spotifyAuth && (
        <>
          <br />
          <p>
            To get the most out of this website, you'll want to authorise
            spotify.
          </p>
          <SpotifyAuth />
        </>
      )}

      {recipeArray.length > 0 && (
        <>
          <div className='userRecipeTile'>
            {recipeArray[page].map((recipe, index) => (
              <UserRecipeTile recipe={recipe} index={index} key={uuidv4()} />
            ))}
          </div>
          <br />

          <div className='page-buttons'>
            {page > 0 && (
              <button
                onClick={() => {
                  setPage(page - 1);
                }}
              >
                Back
              </button>
            )}
            {page < recipeArray.length - 1 && (
              <button
                onClick={() => {
                  setPage(page + 1);
                }}
              >
                Next
              </button>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
