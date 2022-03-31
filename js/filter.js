import {createMarkers, clearMarkers} from './map.js';
import {getData} from './server.js';
import {showAlert} from './utils.js';

const DEFAULT_VALUE = 'any';
const COUNT_DATA = 10;
const COUNT_CACHE = 20;

const filtersForm = document.querySelector('.map__filters');

const type = filtersForm.querySelector('#housing-type');
const price = filtersForm.querySelector('#housing-price');
const rooms = filtersForm.querySelector('#housing-rooms');
const guests = filtersForm.querySelector('#housing-guests');
const features = filtersForm.querySelector('#housing-features');

const RangePrice = {
  LOW: [0,10000],
  MIDDLE: [10000,50000],
  HIGH: [50000,100000],
};

const checkType = (item) => type.value === DEFAULT_VALUE || type.value === item.offer.type;
const checkRooms = (item) => rooms.value === DEFAULT_VALUE || Number(rooms.value) === item.offer.rooms;
const checkGuests = (item) => guests.value === DEFAULT_VALUE || Number(guests.value) === item.offer.guests;
const checkPrice = (item) => price.value === DEFAULT_VALUE || (item.offer.price >= RangePrice[price.value.toUpperCase()][0] && item.offer.price < RangePrice[price.value.toUpperCase()][1]);

const checkFeatures = (item) => Array.from(features.querySelectorAll('.map__checkbox:checked')).every((checkedFeatures) =>
  item.offer.features && item.offer.features.includes(checkedFeatures.value),);


let dataCache = [];
getData((data) => {
  for (let i = 0; i < data.length && i < COUNT_CACHE; i++) {
    dataCache.push(data[i]);
  }
}, showAlert);


const runFilter = () => {
  clearMarkers();
  createMarkers(dataCache.filter((item) => checkType(item) && checkRooms(item) && checkGuests(item) && checkPrice(item) && checkFeatures(item)).slice(0, COUNT_DATA));
};


const loadOffersFromServer = () => {
  dataCache = [];
  getData((data) => {
    for (let i = 0; i < data.length && i < COUNT_CACHE; i++) {
      dataCache.push(data[i]);
    }
    setTimeout(runFilter, 500);
  }, showAlert);
};


export {runFilter, loadOffersFromServer};
