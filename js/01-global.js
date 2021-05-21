'use strict';

const movieUlList = document.querySelector('.js-movielist');
const buttonElement = document.querySelector('.js-btn');
const inputElement = document.querySelector('.js-input');

//const palette = data.palettes[0]

buttonElement.addEventListener('click', showMovies);

function showMovies() {
  movieUlList.innerHTML = '';
  getInfo();
}

function getInfo() {
  const inputValue = inputElement.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      //console.log(data);
      //console.log(data[0].show.name);
      //console.log(data[0].show.image.medium);
      for (let i = 0; i < data.length; i++) {
        const dataShow = data[i].show;
        //const dataShowImage = dataShow.image
        console.log(dataShow);
        console.log(dataShow.image);
        // console.log(dataShow.image.medium);
        if (dataShow.image === null) {
          movieUlList.innerHTML += `
            <li class="movie_list-item">
            <h2 class="movie_title">${dataShow.name}</h2>
            <img src="https://via.placeholder.com/150"/>
             </li>`;
        } else {
          movieUlList.innerHTML += `
        <li class="movie_list-item">
        <h2 class="movie_title">${dataShow.name}</h2>
        <img src="${dataShow.image.medium}"/>
         </li>`;
        }
      }
    });
}

// function paintMovies() {

// }
