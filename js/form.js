import {debounce} from './utils.js';
import {resetMap} from './map.js';
import {runFilter, loadOffersFromServer} from './filter.js';
import {sendData} from './server.js';
import {showSuccess, showError} from './msg-modal.js';

const adForm = document.querySelector('.ad-form');
const fieldsNode = adForm.children;
const filtersForm = document.querySelector('.map__filters');
const filtersNode = filtersForm.children;

const URL_SERVER = 'https://25.javascript.pages.academy/keksobooking';

const toggleActivateForm = (shouldActivate) => {
  adForm.classList[shouldActivate ? 'remove' : 'add']('ad-form--disabled');
  filtersForm.classList[shouldActivate ? 'remove' : 'add']('map__filters--disabled');

  for (const field of fieldsNode) {
    field[shouldActivate ? 'removeAttribute' : 'setAttribute']('disabled','disabled');
  }
  for (const filter of filtersNode) {
    filter[shouldActivate ? 'removeAttribute' : 'setAttribute']('disabled','disabled');
  }
};


const pristine = new Pristine(adForm, {
  classTo: 'ad-form__element',
  errorClass: 'ad-form__element--invalid',
  successClass: 'ad-form__element--valid',
  errorTextParent: 'ad-form__element',
  errorTextTag: 'span',
  errorTextClass: 'form__error'
}, false);

const MAX_PRICE = 100000;
const MIN_LENGTH_TITLE = 30;
const MAX_LENGTH_TITLE = 100;
const WIDTH_IMG = 70;
const HEIGHT_IMG = 70;
const DEFAULT_AVATAR = 'img/muffin-grey.svg';

const avatarPreview = adForm.querySelector('.ad-form-header__preview img');
const fieldPrice = adForm.querySelector('#price');
const fieldType = adForm.querySelector('#type');
const fieldRoom = adForm.querySelector('#room_number');
const fieldCapacity = adForm.querySelector('#capacity');

const elementSlider = adForm.querySelector('.ad-form__slider');


const startFilter = () => {
  loadOffersFromServer();
};

filtersForm.addEventListener('change', debounce(runFilter));


const MinPriceForType = {
  BUNGALOW : '0',
  FLAT : '1000',
  HOTEL : '3000',
  HOUSE : '5000',
  PALACE : '10000',
};

const getMinPrice = () => Number(MinPriceForType[adForm.querySelector('#type').value.toUpperCase()]);


noUiSlider.create(elementSlider, {
  range: {
    min: getMinPrice(),
    max: MAX_PRICE,
  },
  start: 0,
  step: 1,
  connect: 'lower',
});

elementSlider.noUiSlider.on('update', () => {
  fieldPrice.value = elementSlider.noUiSlider.get();
});


function validateTitle(value) {
  return value.length >= MIN_LENGTH_TITLE && value.length <= MAX_LENGTH_TITLE;
}

fieldType.addEventListener('change', (evt) => {
  const price = MinPriceForType[evt.target.value.toUpperCase()];
  elementSlider.noUiSlider.updateOptions({
    range: {
      min: Number(price),
      max: MAX_PRICE,
    },
    start: 0,
  });

  fieldPrice.placeholder = price;
});


fieldPrice.addEventListener('change', (evt) => {
  elementSlider.noUiSlider.updateOptions({
    start: evt.target.value,
  });
});

function validatePrice(value) {
  return value >= getMinPrice() && value <= MAX_PRICE;
}

pristine.addValidator(adForm.querySelector('#title'), validateTitle, `?????????? ???????? ???? ${MIN_LENGTH_TITLE} ???? ${MAX_LENGTH_TITLE} ????????????????`);
pristine.addValidator(fieldPrice, validatePrice, `?????????????????????? ?????????? ${getMinPrice()}, ???????????????????????? ${MAX_PRICE}`);


const OptionCaoacity = {
  1 : ['1',],
  2 : ['1','2'],
  3 : ['1','2','3'],
  100 : ['0',],
};

function validateRoom() {
  return OptionCaoacity[fieldRoom.value].includes(fieldCapacity.value);
}

pristine.addValidator(fieldRoom, validateRoom, `???????????????????? ???????????? ${fieldRoom.value} ???? ?????????????????????????? ?????????? ???????????? ${fieldCapacity.value}`);
pristine.addValidator(fieldCapacity, validateRoom, `?????????? ???????????? ${fieldCapacity.value} ???? ?????????????????????????? ???????????????????? ???????????? ${fieldRoom.value}`);


const fieldTimein = adForm.querySelector('#timein');
const fieldTimeout = adForm.querySelector('#timeout');

fieldTimein.addEventListener('change', (evt) => {
  fieldTimeout.value = evt.target.value;
});

fieldTimeout.addEventListener('change', (evt) => {
  fieldTimein.value = evt.target.value;
});


adForm.querySelector('#avatar').addEventListener('change', (evt) => {
  const reader = new FileReader();

  reader.onload = () => {
    avatarPreview.src = reader.result;
  };

  if (evt.target.files[0]) {
    reader.readAsDataURL(evt.target.files[0]);
  }
});


const elementPhoto = adForm.querySelector('.ad-form__photo');

// ???????????????? ???????????????????? ??????????
adForm.querySelector('#images').addEventListener('change', (evt) => {
  adForm.querySelectorAll('.ad-form__photo').forEach((oldPhoto) => oldPhoto.remove());

  for (let i = 0; i < evt.target.files.length; i++) {
    const reader = new FileReader();

    reader.onload = () => {
      const newPhoto = document.createElement('img');
      newPhoto.src = reader.result;
      newPhoto.width = WIDTH_IMG;
      newPhoto.height = HEIGHT_IMG;
      newPhoto.alt = `???????? ?????????? ${i}`;

      const newElement = elementPhoto.cloneNode();
      newElement.appendChild(newPhoto);
      adForm.querySelector('.ad-form__photo-container').appendChild(newElement);
    };

    reader.readAsDataURL(evt.target.files[i]);
  }
});

// ?????????????? ??????????
const resetForm = () => {
  adForm.reset();
  filtersForm.reset();
  // ?????????????? ???????????????????????? ????????
  avatarPreview.src = DEFAULT_AVATAR;
  adForm.querySelectorAll('.ad-form__photo').forEach((oldPhoto) => oldPhoto.remove());
  resetMap();
  runFilter();
};


const btnSubmit = adForm.querySelector('.ad-form__photo');

const blockSubmitButton = () => {
  btnSubmit.disabled = true;
  btnSubmit.textContent = '????????????????...';
};

const unblockSubmitButton = () => {
  btnSubmit.disabled = false;
  btnSubmit.textContent = '????????????????????????';
};

adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  if (pristine.validate()) {
    blockSubmitButton();

    sendData(URL_SERVER, () => {
      showSuccess();
      unblockSubmitButton();
      resetForm();
    }, () => {
      showError();
      unblockSubmitButton();
    },
    new FormData(evt.target));

  }
});


adForm.querySelector('.ad-form__reset').addEventListener('click', (evt) => {
  evt.preventDefault();
  resetForm();
});

export {toggleActivateForm, startFilter};

