// Renders all different playlist object states (playlist controller)
import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import SpotifyAuth from './SpotifyAuth';
// this is a list of spotify genres that can be used as recommendation seeds
import genres from '../utils/genres.json';
import TrackRecs from './TrackRecs';
import TrackRecForm from './TrackRecForm';

const PlaylistController = ({ recipe, playlistRef }) => {
  const { userData, setUserData, spotifyAuth } = useContext(UserContext);

  // Recomended tracksIds are used as a query parameter for playlist saving
  const [recommendedTrackIds, setRecommendedTrackIds] = useState(undefined);
  // RecommendedTracks are what is actually displayed pre-saving of the tracks
  const [recommendedTracks, setRecommendedTracks] = useState(undefined);
  // These are recommendation parameters
  const [instrumentalness, setInstrumentalness] = useState(0.12);
  const [valence, setValence] = useState(0.5);

  // Function to request recommended tracks from spotify
  const getRecommendedTracks = async () => {
    try {
      const seed_genre = getSeedGenre();

      // Spotify recommendation request
      const trackRecs = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/recommendations?market=AU&seed_genres=${seed_genre}&target_instrumentalness=${instrumentalness}&target_valence=${valence}`,
        headers: {
          Authorization: 'Bearer ' + spotifyAuth,
          'Content-Type': 'application/json'
        }
      });

      // creates and sets the track recommendation arrays
      const trackIds = trackRecs.data.tracks.map(
        (track) => `spotify:track:${track.id}`
      );
      const trackInfo = trackRecs.data.tracks.map((track) => [
        track.name,
        track.artists[0].name,
        track.preview_url,
        track.id
      ]);
      setRecommendedTracks(trackInfo);
      setRecommendedTrackIds(trackIds);
      console.log(trackInfo);
    } catch (err) {
      console.log(err.message);
      console.log('There was an error getting recommended tracks');
    }
  };

  const getSeedGenre = () => {
    const seed_genres = genres.genres;
    const genre_mappings = genres.genre_mappings;
    let seed_genre = [];

    if (recipe.cuisines.length > 0) {
      recipe.cuisines.forEach((cuisine) => {
        if (genre_mappings[cuisine])
          seed_genre.push(genre_mappings[cuisine].genres[0]);
      });
    }

    if (!(seed_genre.length > 0)) {
      seed_genre.push = [
        seed_genres[Math.floor(Math.random() * seed_genres.length)]
      ];
      console.log(seed_genre);
    }
    console.log(seed_genre);
    return seed_genre;
  };

  // Function to actually add recommended tracks to an already created playlist
  const addTracksToPlaylist = async (playlistId) => {
    await axios({
      method: 'post',
      url: `  https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${encodeURIComponent(
        recommendedTrackIds.join(',')
      )}`,
      headers: {
        Authorization: 'Bearer ' + spotifyAuth,
        'Content-Type': 'application/json'
      }
    });
  };

  // Function that creates an empty Spotify playlist
  const createEmptyPlaylist = async () => {
    const spotifyRes = await axios({
      method: 'post',
      url: 'https://api.spotify.com/v1/me/playlists',
      headers: {
        Authorization: 'Bearer ' + spotifyAuth
      },
      data: {
        name: `${recipe.name}`,
        description: `A playlist generated for the ${recipe.name} recipe`,
        public: true
      }
    });
    // returns id of created playlist
    return spotifyRes.data.id;
  };

  // function  to save created playlist id to current user recipe object
  const savePlaylistIdToUser = async (playlistId) => {
    // Save playlistRef to recipe object
    const newPlaylistData = {
      id: userData.user,
      recipeId: recipe.id,
      newPlaylistRef: playlistId
    };

    const newRecipes = await axios.put(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/users/recipes/add-playlist`,
      newPlaylistData,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userData.token
        }
      }
    );

    console.log('playlistRef has been added to recipe');
    // returns playlist Id, and newRecipes data
    return [playlistId, newRecipes.data];
  };

  // Function that actually saves the track array to the empty playlist,
  // mostly a controller of many of the above functions
  const saveTracksToPlaylist = async () => {
    try {
      const playlistId = await createEmptyPlaylist();
      const data = await savePlaylistIdToUser(playlistId);
      await addTracksToPlaylist(data[0]);
      await setUserData({
        token: userData.token,
        user: userData.user,
        recipes: data[1]
      });
      console.log('Playlist made and tracks saved');
    } catch (err) {
      console.log(err.message);
      console.log('there was an error saving the playlist');
    }
  };

  // Function that resets track reccomendation states
  const newRecommendations = () => {
    setRecommendedTrackIds(undefined);
    setRecommendedTracks(undefined);
  };

  // Renders Iframe playlist object if recipe already has a playlist-id attached
  if (playlistRef) {
    return (
      <div className='playlist-container'>
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlistRef}`}
          width='100%'
          height='380'
          allowtransparency='true'
          allow='encrypted-media'
          className='playlist'
          title='Playlist Object'
        ></iframe>
      </div>
    );
    // If spotify has already been authorised by the user
  } else if (spotifyAuth) {
    return (
      <div>
        {recommendedTrackIds ? (
          // If tracks have already been reccomended, render the TrackRecs object
          <TrackRecs
            tracks={recommendedTracks}
            saveTracks={saveTracksToPlaylist}
            newRecommendations={newRecommendations}
          />
        ) : (
          // Else render the recommendations form object
          <TrackRecForm
            instrumentalness={instrumentalness}
            setInstrumentalness={setInstrumentalness}
            valence={valence}
            setValence={setValence}
            getRecommendedTracks={getRecommendedTracks}
          />
        )}
      </div>
    );
  } else {
    // Else renders the prompt to authorise spotify
    return (
      <div>
        <br />
        <p>You might want to authorise Spotify for this one: </p>
        <SpotifyAuth />;
      </div>
    );
  }
};

export default PlaylistController;
