import markupOfSingleCountry from '../templates/single-country-markup.hbs'
import markupOfFewCountries from '../templates/few-countries-markup.hbs'
import Notiflix from "notiflix";

const BASIC_URL = 'https://restcountries.eu/rest/v2/name/';
const OPTIONS = 'fields=name;capital;population;flag;languages'
const markup = document.querySelector('.country-list')

function fetchCountries() {
    if (this.value === '') {
        return Notiflix.Notify.failure('Please enter something');
    };
    fetch(`${BASIC_URL}${this.value}?${OPTIONS}`)
        .then(response => {
                return response.json()
        })
        .then(country => {
            markup.innerHTML = '';
            if (country.status === 404) {
                Notiflix.Notify.failure('Oops, there is no country with that name');
                throw new Error('Please enter a valid country name!')
            }else if (country.length === 1) {
                country[0].languages = country[0].languages.map(lang => lang.name).join(', ')
                markup.insertAdjacentHTML('beforeend', markupOfSingleCountry(country))
            } else if (country.length > 1 && country.length <= 10) {
                markup.insertAdjacentHTML('beforeend', markupOfFewCountries(country))
            } else {
                Notiflix.Notify.info('Too many matches found. Please enter a more specific name.');
            }
        })
                .catch(error => {
                        console.log(error)
                    })
}

export { fetchCountries }