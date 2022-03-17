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

export {toggleActivateForm};

