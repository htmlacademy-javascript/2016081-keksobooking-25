const getData = (url, onSuccess, onError) => {
  fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(`${response.status} ${response.statusText}`);
    })
    .then((data) => onSuccess(data))
    .catch((err) => onError(`Ошибка загрузки ${err}`));
};

const sendData = (url, onSuccess, onError, body) => {
  fetch(
    url,
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

