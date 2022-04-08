import {createMarkers, clearMarkers} from './map.js';
import {getData} from './server.js';
import {showAlert} from './utils.js';

const DEFAULT_VALUE = 'any';
const COUNT_DATA = 10;
const URL_DATA = 'https://25.javascript.pages.academy/keksobooking/data';

const filtersForm = document.querySelector('.map__filters');

const typeNode = filtersForm.querySelector('#housing-type');
const priceNode = filtersForm.querySelector('#housing-price');
const roomsNode = filtersForm.querySelector('#housing-rooms');
const guestsNode = filtersForm.querySelector('#housing-guests');
const featuresNode = filtersForm.querySelector('#housing-features');

const RangePrice = {
  LOW: [0,10000],
  MIDDLE: [10000,50000],
  HIGH: [50000,100000],
};

const checkType = (item) => typeNode.value === DEFAULT_VALUE || typeNode.value === item.offer.type;
const checkRooms = (item) => roomsNode.value === DEFAULT_VALUE || Number(roomsNode.value) === item.offer.rooms;
const checkGuests = (item) => guestsNode.value === DEFAULT_VALUE || Number(guestsNode.value) === item.offer.guests;
const checkPrice = (item) => priceNode.value === DEFAULT_VALUE || (item.offer.price >= RangePrice[priceNode.value.toUpperCase()][0] && item.offer.price < RangePrice[priceNode.value.toUpperCase()][1]);

const checkFeatures = (item) => Array.from(featuresNode.querySelectorAll('.map__checkbox:checked')).every((checkedFeatures) =>
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

