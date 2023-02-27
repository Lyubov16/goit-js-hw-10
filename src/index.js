import './css/styles.css';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
import fetchCountries from './js/fetchCountries';


const DEBOUNCE_DELAY = 300;

const input = document.querySelector('#search-box');
const countryInfoContainer = document.querySelector('.country-info');
const countryList = document.querySelector('.country-list');

input.addEventListener('input', debounce(onInputSearch, DEBOUNCE_DELAY));

function onInputSearch(event) {
    countryInfoContainer.innerHTML = '';
    countryList.innerHTML = '';
    const countryToSearch = event.target.value.trim();
    if (countryToSearch === '') {
        return
    }
    
    fetchCountries(countryToSearch).then(showCountryInfo).catch(showError);
}

function showCountryInfo(country) {
    if (country.length > 10 ) {
        return Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
    }
    
    if (country.length >= 2 && country.length <= 10) {
        return showCountryInfoList(country);
    }
    
    if (country.length === 1) {
        const markup = country
        .map(({ flags, name, capital, population, languages }) => {
        return `<img src="${flags.svg}" alt="${name.official}" width="130px" height="70px">
        <h1 class="country-name">${name.official}</h1>
        <ul class="country-list">
            <li><b>Capital:</b> ${capital}</li>
            <li><b>Population:</b> ${population}</li>
            <li><b>Languages:</b> ${Object.values(languages).join(', ')}</li>
        </ul>`
        })
        .join('')

        countryInfoContainer.innerHTML = markup;  
    }
}
      
function showCountryInfoList(country) {
    const markup = country
        .map(({ flags, name }) => {
            return `
         <li class="country-list__item">
            <img src="${flags.svg}" alt="${name.official}" width="30px" height="30px">
            <p class="country-list__text">${name.official}</p>
        </li>`
        })
        .join('')
    
    countryList.innerHTML = markup;
};

function showError() {
    return Notiflix.Notify.failure("Oops, there is no country with that name"); 
}







// import debounce from 'lodash.debounce';
// import { Notify } from 'notiflix';
// import './css/styles.css';
// import fetchCountries from './js/fetchCountries';
// import renderContries from './js/renderContries';


// const input = document.querySelector('#search-box');
// const DEBOUNCE_DELAY = 300;

// input.addEventListener('input', debounce(onSearchData, DEBOUNCE_DELAY));

// function onSearchData(event) {
//     let inputValue = event.target.value.trim();
//     console.log(inputValue);

// fetchCountries(inputValue)
//     .then(dataCountries => {
//         renderContries(dataCountries);
//     })
//     .catch(error => {
//         Notify.failure('Oops, there is no country with that name');
// })
// }