const URL_DATA = 'https://25.javascript.pages.academy/keksobooking/data';
const URL_SERVER = 'https://25.javascript.pages.academy/keksobooking';

const getData = (onSuccess, onError) => {
  fetch(URL_DATA)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => onSuccess(data))
    .catch((err) => onError(`Ошибка загрузки данных ${err}`));
};

const sendData = (onSuccess, onError, body) => {
  fetch(
    URL_SERVER,
    {
      method: 'POST',
      body,
    },)
    .then((response) => {
      if (response.ok) {
        onSuccess('Ваше объявление успешно размещено!');
      } else if (response.status >= 500 && response.status <= 505) {
        onError('Не удалось получить ответ с сервера. Повторите.');
      } else {
        onError('Не удалось отправить запрос. Повторите.');
      }})
    .catch(() => onError('Не удалось отправить запрос. Повторите.'));
};

export {getData, sendData};

