import './css/styles.css';
import { fetchCountries } from './js/fetchCountries'
var debounce = require('lodash.debounce');

const DEBOUNCE_DELAY = 300;

const input = document.querySelector('.input')

input.addEventListener('input', debounce(fetchCountries, DEBOUNCE_DELAY));

