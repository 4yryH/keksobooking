import {
  avatar,
  title,
  address,
  price,
  type,
  rooms,
  guests,
  checkin,
  checkout,
  features,
  description,
  photos,
  location
} from './data.js';
import {getRandomNumber, getRandomUniqueElement, getRandomArrayElement} from './utils.js';


const createAuthor = () => {
  return {
    avatar: getRandomArrayElement(avatar),
  }
}

const createOffer = () => {
  return {
    title: getRandomArrayElement(title),
    address: address,
    price: getRandomArrayElement(price),
    type: getRandomArrayElement(type),
    rooms: getRandomArrayElement(rooms),
    guests: getRandomArrayElement(guests),
    checkin: getRandomArrayElement(checkin),
    checkout: getRandomArrayElement(checkout),
    features: getRandomUniqueElement(features, getRandomNumber(0, features.length)),
    description: getRandomArrayElement(description),
    photos: new Array(getRandomNumber(1, photos.length - 1)).fill(null).map(() => getRandomArrayElement(photos)),
  }
}

const createAdvertisement = () => {
  return {
    author: createAuthor(),
    offer: createOffer(),
    location: location,
  }
}

const similarAdvertisements = new Array(10).fill(null).map(() => createAdvertisement());

export { similarAdvertisements };
