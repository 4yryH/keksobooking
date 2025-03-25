/* global L:readonly, _:readonly */

import {formAddress} from './form.js';
import {fetchAdvertisements} from './fetch-data.js';
import {filterAdvertisements} from './filter.js';
import {renderMarkers} from './render-advertisement-map.js';
import {showAlert} from './utils.js';

const adForm = document.querySelector('.ad-form');
const elementsAdForm = adForm.elements;
const mapFilters = document.querySelector('.map__filters');
const elementsMapFilters = mapFilters.elements;
const ADVERTISEMENT_LIMIT = 10;
const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

// Отключаем все формы
const formDisabled = function () {
  adForm.classList.add('ad-form--disabled');
  for (let i = 0; i < elementsAdForm.length; i++) {
    elementsAdForm[i].disabled = true;
  }
  mapFilters.classList.add('ad-form--disabled');
  for (let j = 0; j < elementsMapFilters.length; j++) {
    elementsMapFilters[j].disabled = true;
  }
};

formDisabled();

// Подключение карты и при инициализации карты обратно включаем формы
const map = L.map('map-canvas')
  .on('load', () => {
    adForm.classList.remove('ad-form--disabled');
    for (let i = 0; i < elementsAdForm.length; i++) {
      elementsAdForm[i].disabled = false;
    }
    mapFilters.classList.remove('ad-form--disabled');
    for (let j = 0; j < elementsMapFilters.length; j++) {
      elementsMapFilters[j].disabled = false;
    }
  })
  .setView({
    lat: 35.6895, // координаты
    lng: 139.692,
  }, 12); // масштаб

// Добавляем слой самой карты
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// Кастомный главный пин
const mainPinIcon = L.icon({
  iconUrl: '../leaflet/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

// Задаем координаты главного маркера. Разрешаем его перетаскивать
const mainMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.692,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

// Добавляем маркер на карту
mainMarker.addTo(map);

// Завели переменную для дальнейшего изменения координат главного маркера
let mainMarkerAddress = {
  lat: 35.6895,
  lng: 139.692,
};

// Передача координат в форму ввода от маркера на карте
mainMarker.on('move', (evt) => {
  mainMarkerAddress = evt.target.getLatLng();
  return (formAddress.value = `lat: ${mainMarkerAddress.lat.toFixed(5)}, lng: ${mainMarkerAddress.lng.toFixed(5)}`);
});

// Слой для меток
const markersLayer = L.layerGroup().addTo(map);

// Обработчик фильтра
const onFilterChange = () => {
  // Получаем значения фильтров
  const filters = {
    type: mapFilters.querySelector('[name="housing-type"]').value,
    price: mapFilters.querySelector('[name="housing-price"]').value,
    rooms: mapFilters.querySelector('[name="housing-rooms"]').value,
    guests: mapFilters.querySelector('[name="housing-guests"]').value,
    features: Array.from(mapFilters.querySelectorAll('#housing-features input:checked')).map((input) => input.value),
  };

  // Фильтруем объявления
  fetchAdvertisements()
    .then((advertisements) => {
      const filteredAdvertisements = filterAdvertisements(advertisements, filters);
      renderMarkers(filteredAdvertisements, cardTemplate, map, ADVERTISEMENT_LIMIT, markersLayer); // Ограничиваем до 10 объявлений
    })
    .catch(() => {
      showAlert('Не удалось загрузить данные. Попробуйте обновить страницу!');
    });
};

// Делаем задержку отрисовки объявлений во время взаимодействия с фильтром через lodash
const throttledOnFilterChange = _.throttle(onFilterChange, 500);

// Отслеживаем изменения в форме
mapFilters.addEventListener('change', throttledOnFilterChange);

// Первоначальная загрузка объявлений
fetchAdvertisements()
  .then((advertisements) => {
    renderMarkers(advertisements, cardTemplate, map, ADVERTISEMENT_LIMIT, markersLayer);
  })
  .catch(() => {
    showAlert('Не удалось загрузить данные. Попробуйте обновить страницу!');
  });

export { mainMarkerAddress, formDisabled };
