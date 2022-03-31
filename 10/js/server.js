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
    .catch((err) => onError(`Ошибка загрузки ${err}`));
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
        onSuccess();
        return;
      }
      onError();
    });
};

export {getData, sendData};

