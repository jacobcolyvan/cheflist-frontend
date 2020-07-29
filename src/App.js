//Libraries
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserContext from './context/UserContext';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';

//Components
import Navbar from './components/Navbar';
import Home from './pages/Home';
import AddRecipe from './pages/AddRecipe';
import ViewRecipe from './pages/ViewRecipe';
import Register from './pages/Register';
import LoginForm from './pages/LoginForm';
import SpotifyRoutingPage from './pages/SpotifyRoutingPage';
import Dashboard from './pages/Dashboard';

//css
import './App.css';

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
    recipes: undefined,
  });
  const [spotifyAuth, setSpotifyAuth] = useState(true);
  const [recipeArray, setRecipeArray] = useState([]);

  useEffect(() => {
    try {
      const checkLoggedIn = async () => {
        let token = localStorage.getItem('auth-token');
        if (token === null) {
          localStorage.setItem('auth-token', '');
          token = '';
        }
        const tokenRes = await axios.post(
          `${process.env.REACT_APP_BACKEND_BASE_URL}/auth/tokenIsValid`,
          null,
          { headers: { 'x-auth-token': token } }
        );

        if (tokenRes.data.isUser) {
          setUserData({
            token: tokenRes.data.token,
            user: tokenRes.data._id,
            recipes: tokenRes.data.recipes,
          });
        }

        if (tokenRes.data.spotifyAuth) {
          axios
            .post(
              `${process.env.REACT_APP_BACKEND_BASE_URL}/spotify/refresh`,
              { id: tokenRes.data._id },
              {
                headers: {
                  'Content-Type': 'application/json',
                  'x-auth-token': tokenRes.data.token,
                },
              }
            )
            .then((data) => {
              // console.log(data.data.access_token);
              setSpotifyAuth(data.data.access_token);
            });
        } else {
          setSpotifyAuth(false);
        }
      };
      checkLoggedIn();
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    const recipes = userData.recipes;
    if (recipes) {
      const splitRecipes = new Array(Math.ceil(recipes.length / 10))
        .fill()
<<<<<<< HEAD
        .map((_) => recipes.slice(0, 10));
=======
        .map(() => recipes.slice(0, 10));
>>>>>>> 0b71ad284412dac0835dcf57baf45ca45bf7b943
      setRecipeArray(splitRecipes);
    }
  }, [userData]);

  return (
    <div className='main'>
      <Router>
        <UserContext.Provider
          value={{
            userData,
            setUserData,
            spotifyAuth,
            setSpotifyAuth,
            recipeArray,
            setRecipeArray,
          }}
        >
          {userData.user && <Navbar />}

          <br />
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/add' component={AddRecipe} />
            <Route
              exact
              path='/recipes/:id'
              render={(props) => (
                <ViewRecipe
                  recipe={
                    userData.recipes && userData.recipes[props.match.params.id]
                  }
                />
              )}
            />

            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/register' component={Register} />
            <Route exact path='/login' component={LoginForm} />
            <Route path='/spotify-loading' component={SpotifyRoutingPage} />

            <Redirect to='/' />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
};

export default App;
