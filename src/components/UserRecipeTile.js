import React from 'react';
import { Link } from 'react-router-dom';
import './UserRecipeTile.css';

//this is for saved user recipes - rendered on home page

const UserRecipeTile = ({ userRecipes }) => {
  return (
    <div className='userRecipeTile'>
      {userRecipes &&
        userRecipes.map((recipe, index) => (
          <div className='saved-recipes' key={`${recipe}-${index}`}>
            <h3>
              <Link to={`/recipes/${index}`}>{recipe.name}</Link>
            </h3>
            <img src={recipe.image} alt='' />
            <p>Cooking time: {recipe.totalCookingTime}</p>
            {recipe.cuisines.length > 0 && <p>{recipe.cuisines}</p>}
          </div>
        ))}
    </div>
  );
};

export default UserRecipeTile;
