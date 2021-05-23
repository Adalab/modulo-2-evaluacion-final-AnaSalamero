'use strict';

// CONST AND GLOBAL VARIABLES

const showUlList = document.querySelector('.js-showlist');
const showUlListFavourites = document.querySelector('.js-favouriteshowlist');
const buttonElement = document.querySelector('.js-btn');
const inputElement = document.querySelector('.js-input');

let allShowsData = []; // Data received from API
let selectedShowsArray = []; // Array for favourite movies

// FUNCTIONS

function findShows() {
  showUlList.innerHTML = '';
  getInfo();

  //TODO render favourites if I have them
}

function getInfo() {
  const inputValue = inputElement.value;
  fetch(`http://api.tvmaze.com/search/shows?q=${inputValue}`)
    .then((response) => response.json())
    .then((data) => {
      allShowsData = data;
      renderShowList();
      addListenersToLi();
    });
  // allShowsData = JSON.parse(localStorage.getItem('movieLocal'));
}

function addListenersToLi() {
  const liMoviesAll = document.querySelectorAll('.js-li');

  for (const liMovie of liMoviesAll) {
    liMovie.addEventListener('click', handleClickFavourite);
  }
}

function handleClickFavourite(event) {
  let selectedShow;
  selectedShow = event.currentTarget;
  selectedShow.classList.toggle('favourite');

  let selectedObject = {}; //making a new object for every selected show
  selectedObject.name = selectedShow.innerText;
  selectedObject.id = selectedShow.id;
  selectedObject.image = selectedShow.lastElementChild.currentSrc;

  if (selectedShow.classList.contains('favourite')) {
    selectedShowsArray.push(selectedObject);
  }
  saveToLocalStorage();
  // if you unmark they should be out from array
  renderShowFavourites();
}

function saveToLocalStorage() {
  localStorage.setItem('favourites', JSON.stringify(selectedShowsArray));
}

function renderHTMLShow(show) {
  let imageUrl = `https://via.placeholder.com/210x295/ffffff/666666/?text=TV`; //value when image is null
  if (show.image) {
    //value when image is defined
    imageUrl = show.image;
  }
  return `
<li id="${show.id}" class="show_list-item favourite_list-item js-li"> 
<h2 class="">${show.name}</h2> <img src="${imageUrl}"/> </li>`;
}

function renderShowFavourites() {
  showUlListFavourites.innerHTML = '<h2 class="titlefav">Favourites</h2>';
  for (let i = 0; i < selectedShowsArray.length; i++) {
    showUlListFavourites.innerHTML += renderHTMLShow(selectedShowsArray[i]);
  }
}

function renderShowList() {
  //used an object for each show in order to have only one function that renders html

  for (let i = 0; i < allShowsData.length; i++) {
    const dataShow = allShowsData[i].show;
    let myShow = {};
    myShow.name = dataShow.name;
    myShow.id = dataShow.id;
    if (dataShow.image) {
      //some shows come without pic from API
      myShow.image = dataShow.image.medium;
    }
    showUlList.innerHTML += renderHTMLShow(myShow);
  }
}

function showLocalStorage() {
  if (localStorage.getItem('favourites')) {
    selectedShowsArray = JSON.parse(localStorage.getItem('favourites'));
    console.log('hello i have favourites');
    renderShowFavourites(selectedShowsArray);
  }
}

showLocalStorage();

// SEARCHING: 1st step

buttonElement.addEventListener('click', findShows);
