import {getRandomInt, getRandomFloat} from './utils.js';

const OFFER_TITLE = [
  'Квартира в спальном районе',
  'Доступная квартира в хорошем состоянии',
  'Не большая квартира для молодых людей',
  'Квартира в престижном районе',
  'Не большая квартира, распаложена не далеко от метро',
  'Квартира с хорошим евроремонтом',
  'Дешовая квартира без ремонта',
  'Уютная квартира в центре города',
  'Мебелерованная квартира - заходи и живи',
  'Квартира возле парка'
];

const OFFER_DESCRIPTION = [
  'Хорошая квартира в старом доме на втором этаже',
  'В продаже имеется двухкомнатная квартира на первом этаже двухэтажного кирпичного дома.',
  'Высокие потолки. Два санузла. В квартире имеется подвал.',
  'Квартира находится в районе с развитой инфраструктурой, в шаговой доступности 2 детских сада.',
  'При продаже остается кухонный гарнитур, варочная панель и духовой шкаф останется за дополнительную плату.',
  'Квартира, улучшенной планировки на четвертом этаже пяти этажного дома.',
  'Квартира очень теплая, светлая, уютная, комнаты изолированные на обе стороны. На все стоят счетчики. Большой коридор.',
  'Квартира светлая, теплая и уютная. Окна выходят во двор. Рядом остановки общественного транспорта, магазины, аптеки.',
  'В квартире косметический ремонт. В доме подземный паркинг, лифт, кабельное телевидение.',
  'Квартира в хорошем состоянии,чистая. Новая сантехника. Балкон застеклен.'
];

const OFFER_TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel'
];

const OFFER_CHECK = [
  '12:00',
  '13:00',
  '14:00'
];

const OFFER_FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner'
];

const OFFER_PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'
];

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

// выбор несколько не повторяющихся значений из массива
const getRandomArrayElements = (elements, len) => {
  const result = [];
  while (result.length < len) {
    const str = getRandomArrayElement(elements);
    if (!result.includes(str)) {
      result.push(str);
    }
  }
  return result;
};

const createOneOffer = (currentIndex) => {
  const lat = getRandomFloat(35.65000,35.70000,5);
  const lng = getRandomFloat(139.70000,139.80000,5);

  return {
    author: {
      avatar: `img/avatars/user${((currentIndex + 1).toString()).padStart(2, '0')}.png`,
    },
    offer: {
      title: getRandomArrayElement(OFFER_TITLE),
      address: `${lat, lng}`,
      price: getRandomInt(100000,1000000),
      type: getRandomArrayElement(OFFER_TYPE),
      rooms: getRandomInt(1,6),
      guests: getRandomInt(1,13),
      checkin: getRandomArrayElement(OFFER_CHECK),
      checkout: getRandomArrayElement(OFFER_CHECK),
      description: getRandomArrayElement(OFFER_DESCRIPTION),
      features: getRandomArrayElements(OFFER_FEATURES, getRandomInt(1,6)),
      photos: getRandomArrayElements(OFFER_PHOTOS, getRandomInt(1,3)),
    },
    location: {
      lat: lat,
      lng: lng
    },
  };
};

const getDataOffers = (countOffers = 10) => Array.from({length: countOffers}).map((element, idx) => createOneOffer(idx));

export {getDataOffers};
