import {createMarkers, clearMarkers} from './map.js';
import {getData} from './server.js';
import {showAlert} from './utils.js';

const DEFAULT_VALUE = 'any';
const COUNT_DATA = 10;
const URL_DATA = 'https://25.javascript.pages.academy/keksobooking/data';

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

const runFilter = () => {
  const data = [];
  clearMarkers();

  for (let i = 0; i < dataCache.length; i++) {
    if (checkType(dataCache[i]) && checkRooms(dataCache[i]) && checkGuests(dataCache[i]) && checkPrice(dataCache[i]) && checkFeatures(dataCache[i])) {
      if (data.length === COUNT_DATA) {
        break;
      }
      data.push(dataCache[i]);
    }
  }

  createMarkers(data);
};


const loadOffersFromServer = () => {
  getData(URL_DATA, (data) => {
    dataCache = data;
    setTimeout(runFilter, 500);
  }, showAlert);
};


export {runFilter, loadOffersFromServer};

