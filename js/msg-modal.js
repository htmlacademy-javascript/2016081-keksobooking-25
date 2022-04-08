import {isEsc} from './utils.js';

const success = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
const error = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
const msgError = error.querySelector('.error__message');
const btnCloseError = error.querySelector('.error__button');

const showSuccess = () => {
  // создать сообщение
  document.body.appendChild(success);

  // удаление сообщения и обработчик по нажатию Esc
  const keydownEvent = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      success.remove();
      document.removeEventListener('keydown', keydownEvent);
    }
  };
  // добавить обработчик на всю страницу
  document.addEventListener('keydown', keydownEvent);
  // удаляем сообщение и обработчик
  success.addEventListener('click', () => {
    success.remove();
    document.removeEventListener('keydown', keydownEvent);
  });
};


const showError = () => {
  msgError.textContent = 'Ошибка загрузки данных';
  document.body.appendChild(error);

  const keydownEvent = (evt) => {
    if (isEsc(evt)) {
      evt.preventDefault();
      error.remove();
      document.removeEventListener('keydown', keydownEvent);
    }
  };

  document.addEventListener('keydown', keydownEvent);

  btnCloseError.addEventListener('click', () => {
    error.remove();
    document.removeEventListener('keydown', keydownEvent);
  });

  error.addEventListener('click', () => {
    error.remove();
    document.removeEventListener('keydown', keydownEvent);
  });
};

export {showSuccess, showError};

