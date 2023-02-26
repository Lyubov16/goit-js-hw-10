import { Notify } from 'notiflix';

export default function renderContries(dataCountries) {
    console.log(dataCountries)
let countriesAmount = dataCountries.length;
const countriesList = document.querySelector('.country-list');
const countryCard = document.querySelector('.country-info');
const countriesArray = [];

if(countriesAmount > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
} else if(countriesAmount >= 2 && countriesAmount <= 10) {
    countriesArray.push(
        dataCountries.map(country => {
            return `<li>
                <img src='${country.flags.svg}' alt= '${country.flags.alt}' width = 40 >
                <span>${country.name.official}</span>
                </li>
                `
        }).join('')
    );
    countriesList.innerHTML = countriesArray;
} else {
    console.log('1 country');
}
};
