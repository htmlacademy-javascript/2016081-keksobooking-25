import {isEsc} from './utils.js';

const success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const msgError = error.querySelector('.error__message');
const btnCloseError = error.querySelector('.error__button');

const showSuccess = () => {
  // создать сообщение
  document.body.appendChild(success);

  // удаление сообщения и обработчик по нажатию Esc
  const key = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      success.remove();
      document.removeEventListener('keydown', key);
    }
  };
  // добавить обработчик на всю страницу
  document.addEventListener('keydown', key);
  // удаляем сообщение и обработчик
  success.addEventListener('click', () => {
    success.remove();
    document.removeEventListener('keydown', key);
  });
};


const showError = () => {
  msgError.textContent = 'Ошибка загрузки данных';
  document.body.appendChild(error);

  const key = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      error.remove();
      document.removeEventListener('keydown', key);
    }
  };

  document.addEventListener('keydown', key);

  btnCloseError.addEventListener('click', () => {
    error.remove();
    document.removeEventListener('keydown', key);
  });

  error.addEventListener('click', () => {
    error.remove();
    document.removeEventListener('keydown', key);
  });
};

export {showSuccess, showError};

