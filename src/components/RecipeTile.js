import React from 'react';
import './RecipeTile.css';

//renders list of searched recipes
const RecipeTile = ({ recipes, saveRecipe }) => {
  return (
    <div className='recipe-results-container'>
      {recipes.map((recipe, index) => (
        <div key={`recipe${index}`} className='recipe-result'>
          <h3>{recipe.title}</h3>

          <img className='image' src={recipe.image} alt='' />

          <ul>
            {recipe.diets.map((diet, index) => (
              <li key={`diet${index}`}>{diet}</li>
            ))}
          </ul>
          <button
            onClick={() => {
              saveRecipe(index);
            }}
          >
            Favourite/Save
          </button>
        </div>
      ))}
    </div>
  );
};

export default RecipeTile;
