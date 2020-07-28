import React from 'react';

const TrackRecs = ({ tracks, saveTracks, newRecommendations }) => {
  return (
    <div>
      <div className='recommendations-object playlist-container'>
        <p>
          <b>Recommended tracks: </b>
        </p>
        <ul className='recommended-tracks'>
          {tracks.map((track, index) => (
            <li key={`track${index}`}>
              {track[1]}: <i>{track[0]}</i>
            </li>
          ))}
        </ul>
        <button
          data-cy='save-tracks-button'
          className='playlist-button'
          onClick={saveTracks}
        >
          Save As Playlist
        </button>
        <button
          data-cy='new-tracks-button'
          className='playlist-button'
          onClick={newRecommendations}
        >
          New Recommendations
        </button>
      </div>
    </div>
  );
};

export default TrackRecs;
