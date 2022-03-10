const HIDDEN_CLASS = 'hidden';

const setFieldTmp = (fieldTmp, valueData) => {
  if (valueData) {
    fieldTmp.textContent = valueData;
  } else {
    fieldTmp.classList.add(HIDDEN_CLASS);
  }
};

const houseType = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const createCard = (data) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup').cloneNode(true);
  const cardFeatures = cardTemplate.querySelector('.popup__features');
  const cardPhotos = cardTemplate.querySelector('.popup__photos');

  setFieldTmp(cardTemplate.querySelector('.popup__title'), data.offer.title);
  setFieldTmp(cardTemplate.querySelector('.popup__text--address'), data.offer.address);
  setFieldTmp(cardTemplate.querySelector('.popup__text--price'), `${data.offer.price} ₽/ночь`);
  setFieldTmp(cardTemplate.querySelector('.popup__type'), houseType[data.offer.type]);
  setFieldTmp(cardTemplate.querySelector('.popup__text--capacity'), `${data.offer.rooms} комнаты для ${data.offer.guests} гостей`);
  setFieldTmp(cardTemplate.querySelector('.popup__text--time'), `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`);
  setFieldTmp(cardTemplate.querySelector('.popup__description'), data.offer.description);

  if (data.offer.features) {
    const featureList = cardFeatures.querySelectorAll('.popup__feature');
    featureList.forEach((element) => {
      if (!data.offer.features.some((feature) => element.classList.contains(`popup__feature--${feature}`))) {
        element.remove();
      }
    });
  } else {
    cardFeatures.classList.add(HIDDEN_CLASS);
  }

  if (data.offer.photos) {
    const cardPhoto = cardPhotos.querySelector('.popup__photo');
    cardPhoto.src = data.offer.photos[0];
    for (let i = 1; i < data.offer.photos.length; i++) {
      const photo = cardPhoto.cloneNode();
      photo.src = data.offer.photos[i];
      cardPhotos.append(photo);
    }
  } else {
    cardPhotos.classList.add(HIDDEN_CLASS);
  }


  return cardTemplate;
};

export {createCard};

