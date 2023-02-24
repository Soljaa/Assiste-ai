// import fetch from 'node-fetch';

const total_pages = 500;
const movies_per_page = 20;
const API_key = "";
// hide key

function getMovieUrl(movie_id){
  return `https://api.themoviedb.org/3/movie/${movie_id}?api_key=${API_key}&language=pt-BR`;
}

function getHours(min){
  let hours = Math.floor(min/60);
  if (hours > 0){
    return ` ${hours} h ${min - hours * 60} min `;
  }else{
    return ` ${min} min `;
  }
}

function getImageUrl(image_path){
  return `https://image.tmdb.org/t/p/w342${image_path}`;
  // poster_sizes":["w92","w154","w185","w342","w500","w780","original"]
}

const title = document.querySelector("#title");
const sinopse = document.querySelector("#sinopse");
const genero = document.querySelector("#genero");
const info = document.querySelector("#info");
const draw = document.querySelector("#draw");
const banner = document.querySelector("#poster");

function generate_rand_movie(title, sinopse, genero, info, banner){


  let rand_page =  Math.floor(Math.random() * total_pages);
  let rand_movie = Math.floor(Math.random() * movies_per_page);
  const URL_TMDB = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_key}&language=pt-BR&page=${rand_page}`;

  fetch(URL_TMDB)
  .then(function(response) {
    return response.text();
  })
  .then(function(text) {
    fetch(getMovieUrl(JSON.parse(text).results[rand_movie].id)
    )
    .then(function(response) {
      return response.text();
    })
    .then(function(text) {
      let selected_movie_json = JSON.parse(text);      
      title.textContent = selected_movie_json.title;
      if(selected_movie_json.overview){
        sinopse.textContent = selected_movie_json.overview;
      }else{
        sinopse.textContent = "Sinopse indisponível...";
      }
      genero.textContent = "";
      selected_movie_json.genres.forEach(function (gen) {
        genero.textContent += ` ${gen.name} `;
      });
      info.textContent = ` TMDB ${selected_movie_json.vote_average.toFixed(1)} - ${selected_movie_json.release_date.slice(0,4)} - ${getHours(selected_movie_json.runtime)} `;
      banner.src = getImageUrl(selected_movie_json.poster_path);
      banner.alt = title;      
    });
  });
}

draw.addEventListener("click", () => {
  generate_rand_movie(title, sinopse, genero, info, banner);
  });
