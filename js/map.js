import {getDataOffers} from './mock.js';
import {createCard} from './card.js';
import {toggleActivateForm} from './form.js';

const fieldAddress = document.querySelector('#address');

const dataOffers = getDataOffers();

const map = L.map('map-canvas')
  .on('load', () => {
    toggleActivateForm(true);
  });

const loadMap = () => {
  map.setView({
    lat: 35.701916,
    lng: 139.754333,
  }, 13);
};

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',},).addTo(map);

const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerMain = L.marker({
  lat: 35.701916,
  lng: 139.754333,
}, {
  draggable: true,
  icon: mainIcon,
}
);

markerMain.addTo(map);

markerMain.on('moveend', (evt) => {
  const latlng = evt.target.getLatLng();
  fieldAddress.value = `${latlng['lat']}, ${latlng['lng']}`;
});

const markerGroup = L.layerGroup().addTo(map);

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

const createMarker = (data) => {
  const marker = L.marker({
    lat: data.location.lat,
    lng: data.location.lng,
  },{
    icon,
  });
  marker.addTo(markerGroup).bindPopup(createCard(data));
};

dataOffers.forEach((data) => {
  createMarker(data);
});


export {loadMap};

