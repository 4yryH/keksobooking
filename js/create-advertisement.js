// import {
//   avatar,
//   typeTranslation,
//   title,
//   address,
//   price,
//   type,
//   rooms,
//   guests,
//   checkin,
//   checkout,
//   features,
//   description,
//   photos,
//   location
// } from './data.js';
// import {getRandomNumber, getRandomUniqueElement, getRandomArrayElement} from './utils.js';
//
//
// const createAuthor = () => {
//   return {
//     avatar: getRandomArrayElement(avatar),
//   }
// }
//
// const createOffer = () => {
//   return {
//     title: getRandomArrayElement(title),
//     address: `lat: ${getRandomArrayElement(address).x}, lnt: ${getRandomArrayElement(address).y}`,
//     price: getRandomArrayElement(price),
//     type: getRandomArrayElement(type),
//     rooms: getRandomArrayElement(rooms),
//     guests: getRandomArrayElement(guests),
//     checkin: getRandomArrayElement(checkin),
//     checkout: getRandomArrayElement(checkout),
//     features: getRandomUniqueElement(features, getRandomNumber(0, features.length)),
//     description: getRandomArrayElement(description),
//     photos: new Array(getRandomNumber(1, photos.length - 1)).fill(null).map(() => getRandomArrayElement(photos)),
//   }
// }
//
// const createAdvertisement = () => {
//   return {
//     author: createAuthor(),
//     offer: createOffer(),
//     location: getRandomArrayElement(address),
//   }
// }
//
// let cardTemplate = document.querySelector('#card').content.querySelector('.popup');
//
// const renderAdvertisement = function () {
//   const similarAdvertisement = createAdvertisement();
//
//   const advertisement = cardTemplate.cloneNode(true);
//
//   advertisement.querySelector('.popup__avatar').src = similarAdvertisement.author.avatar;
//   advertisement.querySelector('.popup__title').textContent = similarAdvertisement.offer.title;
//   advertisement.querySelector('.popup__text--address').textContent = similarAdvertisement.offer.address;
//   advertisement.querySelector('.popup__text--price').textContent = similarAdvertisement.offer.price + ' ₽/ночь';
//   // Переводим тип жилья на русский язык
//   const type = similarAdvertisement.offer.type;
//   advertisement.querySelector('.popup__type').textContent = typeTranslation[type] || type;
//   advertisement.querySelector('.popup__text--capacity').textContent = `${similarAdvertisement.offer.rooms} комнаты для ${similarAdvertisement.offer.guests} гостей`;
//   advertisement.querySelector('.popup__text--time').textContent = `Заезд после ${similarAdvertisement.offer.checkin}, выезд до ${similarAdvertisement.offer.checkout}`;
//   advertisement.querySelector('.popup__description').textContent = similarAdvertisement.offer.description;
//
//   if (similarAdvertisement.offer.features && similarAdvertisement.offer.features.length > 0) {
//     const featuresContainer = advertisement.querySelector('.popup__features');
//     featuresContainer.innerHTML = ''; // Очищаем контейнер
//
//     similarAdvertisement.offer.features.forEach((feature) => {
//       const li = document.createElement('li');
//       li.classList.add('popup__feature', `popup__feature--${feature}`);
//       featuresContainer.appendChild(li);
//     });
//   }
//
//   if (similarAdvertisement.offer.photos && similarAdvertisement.offer.photos.length > 0) {
//     const photosContainer = advertisement.querySelector('.popup__photos');
//     photosContainer.innerHTML = '';
//
//     similarAdvertisement.offer.photos.forEach((photo) => {
//       const img = document.createElement('img');
//       img.src = photo;
//       img.classList.add('popup__photo');
//       img.width = 45;
//       img.height = 40;
//       img.alt = 'Фотография жилья';
//       photosContainer.appendChild(img);
//     });
//   }
//
//   return advertisement;
// }
//
// const similarAdvertisements = new Array(10).fill(null).map(() => renderAdvertisement());
//
// export {similarAdvertisements};
