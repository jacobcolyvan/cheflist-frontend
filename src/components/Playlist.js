import React, { useContext, useState } from 'react';
import axios from 'axios';
import UserContext from '../context/UserContext';
import SpotifyAuth from './SpotifyAuth';

const Playlist = ({ recipe, playlistRef }) => {
  const { userData, setUserData, spotifyAuth } = useContext(UserContext);
  const [recommendedTrackIds, setRecommendedTrackIds] = useState(undefined);
  const [recommendedTracks, setRecommendedTracks] = useState(undefined);

  const getRecommendedTracks = async () => {
    try {
      const trackRecs = await axios({
        method: 'get',
        url:
          'https://api.spotify.com/v1/recommendations?market=AU&seed_genres=iranian&target_instrumentalness=0.4',
        headers: {
          Authorization: 'Bearer ' + spotifyAuth,
          'Content-Type': 'application/json'
        }
      });
      // console.log(trackRecs);
      const trackIds = trackRecs.data.tracks.map(
        (track) => `spotify:track:${track.id}`
      );
      const trackInfo = trackRecs.data.tracks.map((track) => [
        track.name,
        track.artists[0].name,
        track.preview_url,
        track.id
      ]);
      console.log(trackInfo);
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
        'Content-Type': 'application/json'
      }
    });
  };

  const saveAsPlaylist = async () => {
    // Make spotify request to create new playlist
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

    // Save playlistRef to recipe object
    const playlistRef = spotifyRes.data.id;
    const newPlaylistData = {
      id: userData.user,
      recipeId: recipe.id,
      newPlaylistRef: playlistRef
    };

    const newRecipes = await axios.put(
      `http://localhost:3000/users/recipes/add-playlist`,
      newPlaylistData,
      {
        headers: {
          'Content-Type': 'application/json',
          'x-auth-token': userData.token
        }
      }
    );
    console.log('playlistRef has been added to recipe');
    // await setUserData({
    //   token: userData.token,
    //   user: userData.user,
    //   recipes: newRecipes.data
    // });
    return [playlistRef, newRecipes.data];
  };

  const saveTracksToPlaylist = async () => {
    try {
      const data = await saveAsPlaylist();
      // console.log(pl);
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

  if (playlistRef) {
    return (
      <div className='playlist-container'>
        <iframe
          src={`https://open.spotify.com/embed/playlist/${playlistRef}`}
          width='400'
          height='380'
          allowtransparency='true'
          allow='encrypted-media'
          className='playlist'
          title='Playlist Object'
        ></iframe>
        {/* <button>Delete</button> */}
      </div>
    );
  } else if (spotifyAuth) {
    return (
      <div>
        {recommendedTrackIds ? (
          <div className='recommendations-object'>
            <p>
              <b>Recommended tracks: </b>
            </p>
            <ul className='recommended-tracks'>
              {recommendedTracks.map((track, index) => (
                <li key={`track${index}`}>
                  {track[1]}: <i>{track[0]}</i>
                </li>
              ))}
            </ul>
            <button onClick={saveTracksToPlaylist}>Save As Playlist</button>
          </div>
        ) : (
          <button onClick={getRecommendedTracks}>Get Recommended Tracks</button>
        )}
      </div>
    );
  } else {
    return <SpotifyAuth />;
  }
};

export default Playlist;
