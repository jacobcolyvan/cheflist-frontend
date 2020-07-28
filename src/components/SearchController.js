import React, { useState, useContext, useEffect } from 'react';
import SearchBar from './SearchBar';
import UserContext from '../context/UserContext';
import axios from 'axios';
import RecipeTiles from '../components/RecipeTiles';
import ErrorNotice from '../components/ErrorNotice';
import { useHistory } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import Loader from 'react-loader-spinner';

const SearchController = () => {
  const [searchValue, setSearchValue] = useState('');
  const [currentRecipes, setCurrentRecipes] = useState([]);
  const [offset, setOffset] = useState('');
  const [error, setError] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);

  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const getRecipes = async () => {
    setIsLoading(true);

    try {
      const sort = 'popularity';
      const number = 10;
      const searchResults = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?query=${searchValue}&apiKey=${process.env.REACT_APP_SPOONACULAR_API_KEY}&addRecipeInformation=true&fillIngredients=true&sort=${sort}&offset=${offset}&number=${number}`
        // can also sort by popularity
      );

      const results = searchResults.data.results;
      setIsLoading(false);
      if (results.length > 0) {
        setCurrentRecipes(results);
        setError(undefined);
      } else {
        setError('There were no results found, try your luck another search.');
      }
      console.log('wallah hussy, shes loaded');
    } catch (err) {
      console.log(err);
      console.log('something wrong w/ spoonacular request');
      setIsLoading(false);
    }
  };

  const saveRecipe = async (index) => {
    const data = {
      newRecipe: {
        name: currentRecipes[index].title,
        image: currentRecipes[index].image,
        recipeUrl: currentRecipes[index].sourceUrl,
        cuisines: currentRecipes[index].cuisines,
        sourceName: currentRecipes[index].sourceName,
        summary: currentRecipes[index].summary,
        preptime: currentRecipes[index].preparationMinutes,
        cookingTime: currentRecipes[index].cookingMinutes,
        totalCookingTime: currentRecipes[index].readyInMinutes,
        ingredients: parseIngredients(currentRecipes[index].missedIngredients),
        dishTypes: currentRecipes[index].dishTypes,
        diets: currentRecipes[index].diets,
        instructions: currentRecipes[index].analyzedInstructions,
        winePairing: currentRecipes[index].winePairing,
        playlistRef: '',
        id: uuidv4()
      },
      id: userData.user
    };

    try {
      const newRecipes = await axios.put(
        `${process.env.REACT_APP_BACKEND_BASE_URL}/users/recipes/add`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            'x-auth-token': userData.token
          }
        }
      );

      console.log('recipe has been added');
      await setUserData({
        token: userData.token,
        user: userData.user,
        recipes: newRecipes.data
      });

      history.push(`/recipes/${newRecipes.data.length - 1}`);
    } catch (err) {
      console.log('somethings said no');
      console.log(err);
    }
  };

  const parseIngredients = (ingredients) => {
    let ingredientArray = [];
    ingredients.forEach((ingredient) => {
      ingredientArray.push({
        original: ingredient.original,
        ingredient: ingredient.originalName,
        ingredientAmount: `${ingredient.amount} ${ingredient.unitLong}`
      });
    });
    return ingredientArray;
  };

  useEffect(() => {
    if (offset !== '') {
      getRecipes();
      setCurrentRecipes([]);
      console.log(offset);
    }
  }, [offset]);

  const increaseOffset = () => {
    setOffset(offset + 10);
  };

  const decreaseOffset = () => {
    setOffset(offset - 10);
  };

  return (
    <div>
      <SearchBar
        searchValue={searchValue}
        onSearchValueChange={(newSearchValue) => {
          setSearchValue(newSearchValue);
        }}
        onEnter={getRecipes}
      />

      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      {isLoading && (
        <div className='loader'>
          <Loader type='Puff' color='#00BFFF' height={100} width={100} />
        </div>
      )}

      <RecipeTiles saveRecipe={saveRecipe} recipes={currentRecipes} />
      {/* These are buttons for changing pages */}
      {currentRecipes.length > 0 && (
        <div className='offset-controls'>
          {offset > 0 && <button onClick={decreaseOffset}>Back</button>}
          <button onClick={increaseOffset}>Next</button>
        </div>
      )}
    </div>
  );
};

export default SearchController;
