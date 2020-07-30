const genres = require('./genres.json');

const cuisineGenreMapping = (cuisineArray) => {
  // expects an array
  // const cuisines = cuisineArray && [];
  console.log(genres.genres);
  let cuisine_genres = genres.cuisines.map((cuisine) => {
    if (genres.genres.includes(cuisine.toLowerCase())) return cuisine;
  });
  console.log(cuisine_genres);
};

cuisineGenreMapping('indian');

// include metal tickbox

const genres = {
  British: 'british',
  French: 'french',
  Indian: 'indian',
  Spanish: 'spanish',
  German: 'german',
  Japanese: ['j-dance', 'j-idol', 'j-pop', 'j-rock'],
  Korean: 'k-pop',
  Latin: 'latin',
  Mexican: 'latino',
  Caribbean: 'latino',
  African: 'afrobeat',
  Southern: 'soul',
  'Middle Eastern': ['turkish']
};

// Japanese needs to be checked if array when going through this object
('Chill mood but good mood = summer');
