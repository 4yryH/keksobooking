// Получение случайного целого числа в диапазоне от min до max
const getRandomNumber = function (minNumber = 0, maxNumber = 100) {
  if (minNumber < 0 || maxNumber < 0) {
    return 'Задайте диапазон с положительными числами!';
  }

  if (minNumber === maxNumber) {
    return 'Вы задали одинаковые числа начала и конца диапазона';
  }

  if (minNumber > maxNumber) {
    [minNumber, maxNumber] = [maxNumber, minNumber];
  }

  return Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
}


// Получение случайного числа с десятичной дробью в диапазоне от min до max и указанием количества знаков после запятой
const getNumberFractional = function (minNumber = 0.13, maxNumber = 10.2102, decimals = 5) {
  let countDecimals = function (num) {
    if (!num.toString().includes('.')) {
      return 0;
    } else {
      return num.toString().split('.')[1].length;
    }
  }

  let minDecimals = countDecimals(minNumber);
  let maxDecimals = countDecimals(maxNumber);

  if (minDecimals > decimals || maxDecimals > decimals) {
    return 'Введите в диапазон числа, с количеством знаков не превышающее ограничение. Или измените ограничение количества знаков после запятой'
  }

  if (minNumber < 0 || maxNumber < 0) {
    return 'Задайте диапазон с положительными числами!';
  }

  if (minNumber === maxNumber) {
    return 'Вы задали одинаковые числа начала и конца диапазона';
  }

  if (minNumber > maxNumber) {
    [minNumber, maxNumber] = [maxNumber, minNumber];
  }
  return (Math.random() * (maxNumber - minNumber) + minNumber).toFixed(decimals);
}

// Получение случайного уникального элемента из массива (элементы не будут повторяться)
const getRandomUniqueElement = (arr, count) => {
  const shuffled = arr.slice();
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled.slice(0, count);
}

// Получение случайного элемента из массива (элементы могут повторяться)
const getRandomArrayElement = (arr) => {
  return arr[getRandomNumber(0, arr.length - 1)];
}

// Сообщение об ошибке загрузки объявлений на карте
const ALERT_SHOW_TIME = 5000;
const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 10;
  alertContainer.style.position = 'absolute';
  alertContainer.style.top = '0';
  alertContainer.style.left = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '20px 5px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'blue';
  alertContainer.style.color = 'white';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
}

// Сообщение об ошибке отправки формы объявления
const showError = () => {
  const errorContainer = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
  const closeErrorButton = errorContainer.querySelector('.error__button');

  document.body.append(errorContainer);

  const removeError = () => {
    errorContainer.remove();
    document.removeEventListener('click', onDocumentClick);
    document.removeEventListener('keydown', onEscKeyDown);
  };

  const onDocumentClick = (evt) => {
    if (errorContainer.contains(evt.target)) {
      removeError();
    }
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      removeError();
    }
  };

  closeErrorButton.addEventListener('click', removeError);

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onEscKeyDown);
};

// Сообщение об успешной отправке формы объявления
const onSuccess = () => {
  const successTemplate = document.querySelector('#success').content.querySelector('.success');
  const successContainer = successTemplate.cloneNode(true);
  const adForm = document.querySelector('.ad-form');

  document.body.append(successContainer);

  const removeSuccess = () => {
    if (successContainer) {
      successContainer.remove();
      // Удаляем обработчики событий после закрытия сообщения
      document.removeEventListener('click', onDocumentClick);
      document.removeEventListener('keydown', onEscKeyDown);
    }
  };

  const onDocumentClick = (evt) => {
    if (successContainer.contains(evt.target)) {
      removeSuccess();
    }
  };

  const onEscKeyDown = (evt) => {
    if (evt.key === 'Escape') {
      removeSuccess();
    }
  };

  document.addEventListener('click', onDocumentClick);
  document.addEventListener('keydown', onEscKeyDown);

  if (adForm) {
    adForm.reset()
  }
};

export {getRandomNumber, getNumberFractional, getRandomUniqueElement, getRandomArrayElement, showAlert, showError, onSuccess};
