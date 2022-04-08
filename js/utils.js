const ESC_ALL = 'Escape';
const ESC_IE = 'Esc';
const TIMEDELAY_DEFAULT = 500;

const isEsc = (evt) => evt.key === ESC_ALL || evt.key === ESC_IE;

const debounce = (cb, timeDelay = TIMEDELAY_DEFAULT) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => cb.apply(this, rest), timeDelay);
  };
};

const showAlert = (message) => {
  const SHOW_ALERT_TIME = 2000;
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '1000';
  alertContainer.style.position = 'fixed';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '28px';
  alertContainer.style.color = '#c4d0e8';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = '#4b70b5';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, SHOW_ALERT_TIME);
};


export {isEsc, debounce, showAlert};

