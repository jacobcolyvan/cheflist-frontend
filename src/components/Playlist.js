import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import SpotifyAuth from './SpotifyAuth';
import genres from '../utils/genres.json';
import TrackRecs from './TrackRecs';

const Playlist = ({ recipe, playlistRef }) => {
  const { userData, setUserData, spotifyAuth } = useContext(UserContext);
  const [recommendedTrackIds, setRecommendedTrackIds] = useState(undefined);
  const [recommendedTracks, setRecommendedTracks] = useState(undefined);

  const [instrumentalness, setInstrumentalness] = useState(0.12);
  const [valence, setValence] = useState(0.5);

  const getRecommendedTracks = async () => {
    try {
      const seed_genres = genres.genres;
      const seed_genre =
        seed_genres[Math.floor(Math.random() * seed_genres.length)];
      console.log(seed_genre);

      const trackRecs = await axios({
        method: 'get',
        url: `https://api.spotify.com/v1/recommendations?market=AU&seed_genres=${seed_genre}&target_instrumentalness=${instrumentalness}&target_valence=${valence}`,
        headers: {
          Authorization: 'Bearer ' + spotifyAuth,
          'Content-Type': 'application/json',
        },
      });
      // console.log(trackRecs);
      const trackIds = trackRecs.data.tracks.map(
        (track) => `spotify:track:${track.id}`
      );
      const trackInfo = trackRecs.data.tracks.map((track) => [
        track.name,
        track.artists[0].name,
        track.preview_url,
        track.id,
      ]);
      // console.log(trackInfo);
      setRecommendedTracks(trackInfo);
      setRecommendedTrackIds(trackIds);
    } catch (err) {
      console.log(err);
      console.log('There was an error getting recommended tracks');
    }
  };

  const addTracksToPlaylist = async (playlistId) => {
    await axios({
      method: 'post',
      url: `  https://api.spotify.com/v1/playlists/${playlistId}/tracks?uris=${encodeURIComponent(
        recommendedTrackIds.join(',')
      )}`,
      headers: {
        Authorization: 'Bearer ' + spotifyAuth,
        'Content-Type': 'application/json',
      },
    });
  };

  const createEmptyPlaylist = async () => {
    // Make spotify request to create new playlist
    const spotifyRes = await axios({
      method: 'post',
      url: 'https://api.spotify.com/v1/me/playlists',
      headers: {
        Authorization: 'Bearer ' + spotifyAuth,
      },
      data: {
        name: `${recipe.name}`,
        description: `A playlist generated for the ${recipe.name} recipe`,
        public: true,
      },
    });
    return spotifyRes.data.id;
  };

  const savePlaylistIdToUser = async (playlistId) => {
    // Save playlistRef to recipe object
    const newPlaylistData = {
      id: userData.user,
      recipeId: recipe.id,
      newPlaylistRef: playlistId,
    };

    const newRecipes = await axios.put(
      `${process.env.REACT_APP_BACKEND_BASE_URL}/users/recipes/add-playlist`,
      newPlaylistData,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userData.token,
        },
      }
    );
    console.log('playlistRef has been added to recipe');
    return [playlistId, newRecipes.data];
  };

  const saveTracksToPlaylist = async () => {
    try {
      const playlistId = await createEmptyPlaylist();
      console.log(playlistId);
      const data = await savePlaylistIdToUser(playlistId);
      console.log(data);
      // console.log(pl);
      await addTracksToPlaylist(data[0]);
      await setUserData({
        token: userData.token,
        user: userData.user,
        recipes: data[1],
      });
      console.log('Playlist made and tracks saved');
    } catch (err) {
      console.log(err.message);
      console.log('there was an error saving the playlist');
    }
  };

  const newRecommendations = () => {
    setRecommendedTrackIds(undefined);
    setRecommendedTracks(undefined);
  };

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
  } else if (spotifyAuth) {
    return (
      <div>
        {recommendedTrackIds ? (
          <TrackRecs
            tracks={recommendedTracks}
            saveTracks={saveTracksToPlaylist}
            newRecommendations={newRecommendations}
          />
        ) : (
          <div className='recommendations-form playlist-container'>
            <label>
              Choose how instrumental you'd like your playlist.
              <select
                value={instrumentalness}
                onChange={(event) => {
                  setInstrumentalness(event.target.value);
                }}
              >
                <option value='0.02'>Give me voices</option>
                <option defaultValue value='0.1'>
                  A little less voices please
                </option>
                <option value='0.2'>
                  Can we turn down the voices some more?
                </option>
                <option value='0.5'>Zen Zone</option>
              </select>
            </label>

            <label>
              Whats your mood?
              <select
                value={valence}
                onChange={(event) => {
                  setValence(event.target.value);
                }}
              >
                <option value='0.25'>My dog just died</option>
                <option defaultValue value='0.5'>
                  Pretty standard
                </option>
                <option value='0.7'>Feeling great</option>
              </select>
            </label>

            <button className='playlist-button' onClick={getRecommendedTracks}>
              Get Recommended Tracks
            </button>
          </div>
        )}
      </div>
    );
  } else {
    return <SpotifyAuth />;
  }
};

export default Playlist;
