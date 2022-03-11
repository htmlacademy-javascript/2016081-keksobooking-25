import {getDataOffers} from './mock.js';
import {createCard} from './card.js';
import {activateForm, disableForm} from './form.js';

const dataOffers = getDataOffers();
document.querySelector('#map-canvas').append(createCard(dataOffers[0]));

disableForm();
activateForm();
