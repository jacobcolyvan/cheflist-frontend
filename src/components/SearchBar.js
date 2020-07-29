import React from 'react';
import '../styles/SearchBar.css';
//search bar for finding recipes

// takes in props from SearchController
const SearchBar = (props) => {
  return (
    <div className='searchbar'>
      <label>Search for recipes</label>
      <input
        data-cy='searchbar'
        placeholder='Type your search term here and hit enter'
        type='text'
        // set the value to be that of the searchValue
        value={props.searchValue}
        // any time the input changes call props.onSearchValueChange on the event.target.value which should be the input
        onChange={(event) => {
          props.onSearchValueChange(event.target.value);
        }}
        //when the enter key is pressed, call props.onEnter() which should get recipes for us in SearchController.js
        onKeyUp={(event) => {
          if (event.keyCode === 13) {
            props.onEnter();
          }
        }}
      />
    </div>
  );
};

export default SearchBar;
