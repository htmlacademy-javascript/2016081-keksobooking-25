const adForm = document.querySelector('.ad-form');
const fields = adForm.children;
const filtersForm = document.querySelector('.map__filters');
const filters = filtersForm.children;


const disableForm = () => {
  adForm.classList.add('ad-form--disabled');
  filtersForm.classList.add('.map__filters--disabled');

  for (const field of fields) {
    field.setAttribute('disabled','disabled');
  }
  for (const filter of filters) {
    filter.setAttribute('disabled','disabled');
  }
};

const activateForm = () => {
  adForm.classList.remove('ad-form--disabled');
  filtersForm.classList.remove('.map__filters--disabled');
  for (const field of fields) {
    field.removeAttribute('disabled');
  }
  for (const filter of filters) {
    filter.removeAttribute('disabled');
  }
};


export {disableForm, activateForm };
