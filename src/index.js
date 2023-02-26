import debounce from 'lodash.debounce';
import { Notify } from 'notiflix';
import './css/styles.css';
import fetchCountries from './js/fetchCountries';
import renderContries from './js/renderContries';


const input = document.querySelector('#search-box');
const DEBOUNCE_DELAY = 300;

input.addEventListener('input', debounce(onSearchData, DEBOUNCE_DELAY));

function onSearchData(event) {
    let inputValue = event.target.value.trim();
    console.log(inputValue);

fetchCountries(inputValue)
    .then(dataCountries => {
        renderContries(dataCountries);
    })
    .catch(error => {
        Notify.failure('Oops, there is no country with that name');
})
}

