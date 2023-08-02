import IndiaCities from '../data/India-city-names.json';
import USCities from '../data/US_States_and_Cities.json';

const cityOptions = [];

Object.keys(IndiaCities).forEach((country) => {
  IndiaCities[country].forEach((city) => {
    cityOptions.push({ value: `${city}, ${country}`, label: `${city}, ${country}` });
  });
});

Object.keys(USCities).forEach((country) => {
  USCities[country].forEach((city) => {
    cityOptions.push({ value: `${city}, ${country}`, label: `${city}, ${country}` });
  });
});

export default cityOptions;
