/* global L:readonly */

import { renderAdvertisement } from './render-advertisements.js';

// Отрисовка меток объявлений на карте
const renderMarkers = (advertisements, cardTemplate, map, limit, markersLayer) => {
  // Очищаем текущие метки
  markersLayer.clearLayers();

  // Ограничиваем количество объявлений
  const limitedAdvertisements = advertisements.slice(0, limit);

  // Создаем элементы объявлений
  const advertisementElements = renderAdvertisement(limitedAdvertisements, cardTemplate);

  // Добавляем новые метки
  limitedAdvertisements.forEach((advertisement, index) => {
    const { location } = advertisement;

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

    // Добавляем метку в слой
    marker
      .addTo(markersLayer)
      .bindPopup(advertisementElements[index]);
  });
};

export { renderMarkers };
