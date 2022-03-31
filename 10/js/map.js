import {createCard} from './card.js';
import {toggleActivateForm, startFilter} from './form.js';

const fieldAddress = document.querySelector('#address');


const ZOOM_MAP = 13;
const COORDINATES_TOKYO = {
  lat: 35.69099,
  lng: 139.75433,
};


const map = L.map('map-canvas')
  .on('load', () => {
    toggleActivateForm(true);
    fieldAddress.value = `${COORDINATES_TOKYO.lat}, ${COORDINATES_TOKYO.lng}`;
    startFilter();
  });

const loadMap = () => {
  map.setView(COORDINATES_TOKYO, ZOOM_MAP);
};

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',},).addTo(map);

const mainIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerMain = L.marker(
  COORDINATES_TOKYO,
  {
    draggable: true,
    icon: mainIcon,
  }
);

markerMain.addTo(map);

markerMain.on('moveend', (evt) => {
  const latlng = evt.target.getLatLng();
  fieldAddress.value = `${latlng['lat'].toFixed(5)}, ${latlng['lng'].toFixed(5)}`;
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

const createMarkers = (dataOffers) => {
  dataOffers.forEach((data) => {
    createMarker(data);
  });
};

const clearMarkers = () => markerGroup.clearLayers();

const resetMap = () => {
  clearMarkers();
  map.setView(COORDINATES_TOKYO, ZOOM_MAP);
  markerMain.setLatLng(COORDINATES_TOKYO);
  fieldAddress.value = `${COORDINATES_TOKYO.lat}, ${COORDINATES_TOKYO.lng}`;
};


export {loadMap, resetMap, createMarkers, clearMarkers};

