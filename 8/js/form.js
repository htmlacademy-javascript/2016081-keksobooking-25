const adForm = document.querySelector('.ad-form');
const fields = adForm.children;
const filtersForm = document.querySelector('.map__filters');
const filters = filtersForm.children;


const toggleActivateForm = (shouldActivate) => {
  adForm.classList[shouldActivate ? 'remove' : 'add']('ad-form--disabled');
  filtersForm.classList[shouldActivate ? 'remove' : 'add']('map__filters--disabled');

  for (const field of fields) {
    field[shouldActivate ? 'removeAttribute' : 'setAttribute']('disabled','disabled');
  }
  for (const filter of filters) {
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

const fieldPrice = adForm.querySelector('#price');
const fieldType = adForm.querySelector('#type');
const fieldRoom = adForm.querySelector('#room_number');
const fieldCapacity = adForm.querySelector('#capacity');

const elementSlider = adForm.querySelector('.ad-form__slider');


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
  return value.length >= 30 && value.length <= 100;
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
  return value >= getMinPrice() && value <= 100000;
}

pristine.addValidator(adForm.querySelector('#title'), validateTitle, 'Длина поля от 30 до 100 символов');
pristine.addValidator(fieldPrice, validatePrice, `Минимальная сумма ${getMinPrice()}, максимальная 100000`);


const optionCaoacity = {
  1 : ['1',],
  2 : ['1','2'],
  3 : ['1','2','3'],
  100 : ['0',],
};

function validateRoom() {
  return optionCaoacity[fieldRoom.value].includes(fieldCapacity.value);
}

pristine.addValidator(fieldRoom, validateRoom, `Количество комнат ${fieldRoom.value} не соответствует числу гостей ${fieldCapacity.value}`);
pristine.addValidator(fieldCapacity, validateRoom, `Число гостей ${fieldCapacity.value} не соответствует количеству комнат ${fieldRoom.value}`);


adForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();

});


export {toggleActivateForm};

