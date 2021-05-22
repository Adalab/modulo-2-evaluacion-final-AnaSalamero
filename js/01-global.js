'use strict';

const movieUlList = document.querySelector('.js-movielist');
const movieUlListFavourites = document.querySelector('.js-favouritemovielist');
const buttonElement = document.querySelector('.js-btn');
const inputElement = document.querySelector('.js-input');
let allMovies = [];
let selectedMovie;
const selectedMovieArray = [];

function showMovies() {
  movieUlList.innerHTML = '';

  getInfo();
}

function getInfo() {
  const inputValue = inputElement.value;
  //if (localStorage.getItem('movieLocal') === null) {
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      allMovies = data;
      //localStorage.setItem('movieLocal', JSON.stringify(allMovies));
      console.log(allMovies);
      renderMovies();
      //console.log(data);
      //console.log(data[0].show.name);
      //console.log(data[0].show.image.medium);
    });
  //} else {
  // allMovies = JSON.parse(localStorage.getItem('movieLocal'));
  //!allMovies = data;
  // const dataLocal
  //allMovies
  //renderMovies();
  // }
}

function addListenersToLi() {
  const liMoviesAll = document.querySelectorAll('.js-li');

  for (const liMovie of liMoviesAll) {
    liMovie.addEventListener('click', handleClickFavourite);
  }
}

function handleClickFavourite(event) {
  console.log(event.target);
  console.log(event.currentTarget);
  selectedMovie = event.currentTarget;
  console.log(selectedMovie);
  selectedMovie.classList.toggle('favourite');
  console.log(selectedMovie);

  if (selectedMovie.classList.contains('favourite')) {
    selectedMovieArray.push(selectedMovie);
  }
  console.log(selectedMovieArray);
  // if you unmark they should be out from array

  renderFavouriteMovies();
}

function renderFavouriteMovies() {
  console.log(selectedMovieArray[0]);
  movieUlListFavourites.innerHTML = '<h2>Favourites</h2>';
  for (let i = 0; i < selectedMovieArray.length; i++) {
    movieUlListFavourites.innerHTML += selectedMovieArray[i].innerHTML;
  }
}

function renderMovies() {
  for (let i = 0; i < allMovies.length; i++) {
    //console.log(data[i].show);
    const dataShow = allMovies[i].show;
    //const dataShowImage = dataShow.image
    console.log(dataShow);
    console.log(dataShow.image);
    // console.log(dataShow.image.medium);
    if (dataShow.image === null) {
      movieUlList.innerHTML += `
        <li class="movie_list-item js-li">
        <h2 class="movie_title">${dataShow.name}</h2>
        <img src="https://via.placeholder.com/150"/>
         </li>`;
    } else {
      movieUlList.innerHTML += `
    <li class="movie_list-item js-li">
    <h2 class="movie_title">${dataShow.name}</h2>
    <img src="${dataShow.image.medium}"/>
     </li>`;
    }
  }
  addListenersToLi();
}

// SEARCHING

buttonElement.addEventListener('click', showMovies);
