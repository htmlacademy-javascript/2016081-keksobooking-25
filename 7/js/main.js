import {getDataOffers} from './mock.js';
import {createCard} from './card.js';
import {toggleActivateForm} from './form.js';

const dataOffers = getDataOffers();
document.querySelector('#map-canvas').append(createCard(dataOffers[0]));

toggleActivateForm(true);
