// import {similarAdvertisements} from './create-advertisement.js';
// import {address} from './data.js';
import {formAddress} from './form.js';
import {renderAdvertisement} from './render-advertisements.js';
import {fetchAdvertisements} from './fetch-data.js'
import {showAlert} from './utils.js';

const adForm = document.querySelector('.ad-form');
const elementsAdForm = adForm.elements;
const mapFilters = document.querySelector('.map__filters');
const elementsMapFilters = mapFilters.elements;

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
}

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


// кастомный главный пин
const mainPinIcon = L.icon({
  iconUrl: '../leaflet/img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
})

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
)

// Добавляем маркер на карту
mainMarker.addTo(map);

// Завели переменную для дальнейшего изменения координат главного маркера
let mainMarkerAddress = {
  lat: 35.6895,
  lng: 139.692,
};

// Передача координат в форму ввода от маркера на карте
mainMarker.on('move', (evt) => {
  mainMarkerAddress = evt.target.getLatLng()
  return formAddress.value = `lat: ${mainMarkerAddress.lat.toFixed(5)}, lng: ${mainMarkerAddress.lng.toFixed(5)}`;
});

// Генерируем маркеры с описанием объявлений из симуляции объявлений
// address.forEach(({x, y}, index) => {
//   const pinIcon = L.icon({ // кастомный пин
//     iconUrl: '../leaflet/img/pin.svg',
//     iconSize: [40, 40],
//     iconAnchor: [20, 40],
//   });
//
//   const marker = L.marker(
//     [x, y],
//     {
//       icon: pinIcon,
//     },
//   );
//   marker
//     .addTo(map)
//     .bindPopup(similarAdvertisements[index]);
// })

// Удалить маркер
// mainPinMarker.remove();

const renderMarkers = (advertisements, cardTemplate, map) => {
  const advertisementElements = renderAdvertisement(advertisements, cardTemplate);

  advertisements.forEach((advertisement, index) => {
    const {location} = advertisement;

    const pinIcon = L.icon({
      iconUrl: '../leaflet/img/pin.svg',
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });

    const marker = L.marker(
      [location.lat, location.lng],
      {
        icon: pinIcon,
      },
    );

    marker
      .addTo(map)
      .bindPopup(advertisementElements[index]);
  });
};

const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

fetchAdvertisements()
  .then((advertisements) => {
    renderMarkers(advertisements, cardTemplate, map);
  })
  .catch(() => {
    showAlert('Не удалось загрузить данные. Попробуйте обновить страницу!')
  });

export {mainMarkerAddress}
