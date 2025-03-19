import {mainMarkerAddress} from './map.js';
import {showError, onSuccess} from './utils.js';

// Форма выбора типа жилья и минимальной цены за ночь
const typeHousing = document.querySelector('#type');
const priceHousing = document.querySelector('#price');
const formAddress = document.querySelector('#address');
const titleInput = document.querySelector('#title');
const roomNumberInput = document.querySelector('#room_number');
const capacityInput = document.querySelector('#capacity');
const timeIn = document.querySelector('#timein');
const timeOut = document.querySelector('#timeout');
const adForm = document.querySelector('.ad-form');
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;

// Валидация формы заголовка объявления
titleInput.addEventListener('input', () => {
  const valueLength = titleInput.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Необходимо ввести еще ${MIN_TITLE_LENGTH - valueLength} симв.`);
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleInput.setCustomValidity(`Удалите лишние ${valueLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    titleInput.setCustomValidity('');
  }

  titleInput.reportValidity();
})

// Валидация цены за ночь в зависимости от типа жилья
if (typeHousing.value === 'flat') {
  priceHousing.placeholder = 1000;
  priceHousing.min = 1000;
}

typeHousing.addEventListener('change', function () {
  if (typeHousing.value === 'bungalow') {
    priceHousing.min = 0;
    priceHousing.placeholder = 0;
  } else if (typeHousing.value === 'flat') {
    priceHousing.placeholder = 1000;
    priceHousing.min = 1000;
  } else if (typeHousing.value === 'house') {
    priceHousing.placeholder = 5000;
    priceHousing.min = 5000;
  } else if (typeHousing.value === 'palace') {
    priceHousing.placeholder = 10000;
    priceHousing.min = 10000;
  }
});

// Форма выбора времени заезда и выезда
timeIn.addEventListener('change', function () {
  timeOut.value = timeIn.value;
});

timeOut.addEventListener('change', function () {
  timeIn.value = timeOut.value;
});

// Форма адрес (координаты). По умолчанию запрещен ввод данных пользователем

formAddress.readOnly = true;
formAddress.value = `lat: ${mainMarkerAddress.lat.toFixed(5)}, lng: ${mainMarkerAddress.lng.toFixed(5)}`;

// Зависимость формы количества гостей от количества комнат
const updateCapacityOptions = function () {
  const selectedRoomNumber = roomNumberInput.value;
  Array.from(capacityInput.options).forEach((option) => {
    if (selectedRoomNumber === '1') {
      option.disabled = option.value !== '1';
    } else if (selectedRoomNumber === '2') {
      option.disabled = option.value !== '1' && option.value !== '2';
    } else if (selectedRoomNumber === '3') {
      option.disabled = option.value !== '1' && option.value !== '2' && option.value !== '3';
    } else if (selectedRoomNumber === '100') {
      option.disabled = option.value !== '0';
    } else {
      option.disabled = false;
    }
  });
  if (selectedRoomNumber === '1') {
    capacityInput.value = '1';
  } else if (selectedRoomNumber === '2') {
    capacityInput.value = '2';
  } else if (selectedRoomNumber === '3') {
    capacityInput.value = '3';
  } else if (capacityInput.options[capacityInput.selectedIndex].disabled) {
    capacityInput.value = '0';
  }
};

roomNumberInput.addEventListener('change', updateCapacityOptions);

updateCapacityOptions()

// Отмена дефолтной отправки формы, отправка через JS без перезагрузки страницы
const formAdvertisementSubmit = (onSuccess) => {
  adForm.addEventListener('submit', function (evt) {
    evt.preventDefault();

    const formData = new FormData(evt.target);

    fetch(
      'https://23.javascript.htmlacademy.pro/keksobooking',
      {
        method: 'POST',
        body: formData,
      },
    ).then((response) => {
      console.log('response: ', response);
      console.log('reponse.ok: ', response.ok);

      if (response.ok) {
        onSuccess()
      } else {
        showError()
      }
    })
      .catch(() => {
        showError();
      });
  });
};

export {formAddress, formAdvertisementSubmit};
