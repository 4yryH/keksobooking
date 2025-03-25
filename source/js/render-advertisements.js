import {typeTranslation} from './data.js'

const renderAdvertisement = (advertisements, cardTemplate) => {
  const advertisementElements = [];

  advertisements.forEach(advertisement => {
    const advertisementElement = cardTemplate.cloneNode(true);
    advertisementElement.querySelector('.popup__avatar').src = advertisement.author.avatar;
    advertisementElement.querySelector('.popup__title').textContent = advertisement.offer.title;
    advertisementElement.querySelector('.popup__text--address').textContent = advertisement.offer.address;
    advertisementElement.querySelector('.popup__text--price').textContent = advertisement.offer.price + ' ₽/ночь';
    const type = advertisement.offer.type;
    advertisementElement.querySelector('.popup__type').textContent = typeTranslation[type] || type;
    advertisementElement.querySelector('.popup__text--capacity').textContent = `${advertisement.offer.rooms} комнаты для ${advertisement.offer.guests} гостей`;
    advertisementElement.querySelector('.popup__text--time').textContent = `Заезд после ${advertisement.offer.checkin}, выезд до ${advertisement.offer.checkout}`;
    advertisementElement.querySelector('.popup__description').textContent = advertisement.offer.description;

    if (advertisement.offer.features && advertisement.offer.features.length > 0) {
      const featuresContainer = advertisementElement.querySelector('.popup__features');
      featuresContainer.innerHTML = '';

      advertisement.offer.features.forEach((feature) => {
        const li = document.createElement('li');
        li.classList.add('popup__feature', `popup__feature--${feature}`);
        featuresContainer.appendChild(li);
      });
    }

    if (advertisement.offer.photos && advertisement.offer.photos.length > 0) {
      const photosContainer = advertisementElement.querySelector('.popup__photos');
      photosContainer.innerHTML = '';

      advertisement.offer.photos.forEach((photo) => {
        const img = document.createElement('img');
        img.src = photo;
        img.classList.add('popup__photo');
        img.width = 45;
        img.height = 40;
        img.alt = 'Фотография жилья';
        photosContainer.appendChild(img);
      });
    }

    advertisementElements.push(advertisementElement);
  });

  return advertisementElements
};

export {renderAdvertisement};
