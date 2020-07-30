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

// cuisineGenreMapping('indian');

// include metal tickbox

const genre_mappings = {
  British: { genres: ['british'] },
  Chinese: { genres: ['mandopop'] },
  French: { genres: ['french'] },
  Indian: { genres: ['indian'] },
  Spanish: { genres: ['spanish'] },
  German: { genres: ['german'] },
  Japanese: { genres: ['j-dance', 'j-idol', 'j-pop', 'j-rock'] },
  Korean: { genres: ['k-pop'] },
  Latin: { genres: ['latin'] },
  Mexican: { genres: ['latino'] },
  Caribbean: { genres: ['latino'] },
  African: { genres: ['afrobeat'] },
  Southern: { genres: ['soul', 'blues', 'bluegrass'] },
  'Middle Eastern': { genres: ['turkish'] }
};

// ('Chill mood but good mood = summer');

const cuisineGenreMapping2 = (cuisine) => {
  // let cuisine_genres = genres.cuisines.map((cuisine) => {
  //   if (genres.genres.includes(cuisine.toLowerCase())) return cuisine;
  // });
  // console.log(cuisine_genres);
  if (genre_mappings[cuisine]) {
    console.log(genre_mappings[cuisine]);
  }
};

cuisineGenreMapping2('African');
