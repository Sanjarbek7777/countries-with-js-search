const COUNTRIES_API_URL = 'https://restcountries.com/v3.1/name/';


const elInfo = document.querySelector('.js-info');
const elSearchForm = document.querySelector('.js-search-form');
const elSearchInput = document.querySelector('.js-search-input');
const elCountriesList = document.querySelector('.countries-list');
const elCountriesTemplate = document.querySelector('#countries-item-template').content;
const elDarkButton = document.querySelector('.js-dark-mode-btn');
const elSiteBody = document.querySelector('.body');
const elSiteHeaderLink = document.querySelector('.site-header-link');

if (elDarkButton) {
  elDarkButton.addEventListener('click', function(evt){
    elDarkButton.classList.toggle('btn-dark');
    elSiteBody.classList.toggle('bg-dark');
    elSiteHeaderLink.classList.toggle('text-white');
  });
}

function getJSON(url){
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.status !== 404){
        showCountries(data);
      }else{
        elInfo.textContent = data.message;
      }
    });
}

function showCountries(data){
  elCountriesList.innerHTML = "";
  const elCountriesFragment = document.createDocumentFragment();
  data.forEach(country => {
    const elCountry = elCountriesTemplate.cloneNode(true);
    elCountry.querySelector('.js-country-flag').src = country.flags.svg;
    elCountry.querySelector('.js-country-name').textContent = country.name.common;
    elCountry.querySelector('.population').textContent = country.population;
    elCountry.querySelector('.region').textContent = country.region;
    elCountry.querySelector('.capital').textContent = country.capital;

    elCountriesFragment.appendChild(elCountry);
  });
  elCountriesList.appendChild(elCountriesFragment);
}

function onSearchFormSubmit(evt){
  evt.preventDefault();

  const searchUrl = COUNTRIES_API_URL + elSearchInput.value.trim();
  getJSON(searchUrl);
}

if(elSearchForm){
  elSearchForm.addEventListener('submit', onSearchFormSubmit);
}

// function uppercase(str){
//   return str.toUpperCase();
// }

// function lowercase(str){
//   return str.toLowerCase();
// }

// function changeCase(str, callbackFn){
//   return callbackFn(str);
// }

// console.log(changeCase('hello', uppercase));