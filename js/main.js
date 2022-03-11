import {getDataOffers} from './mock.js';
import {createCard} from './card.js';

const dataOffers = getDataOffers();
document.querySelector('#map-canvas').append(createCard(dataOffers[0]));

