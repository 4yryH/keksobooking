import {getNumberFractional} from './utils.js';

// data for location
const location = function () {
  return {
    x: getNumberFractional(35.65000, 35.70000, 5),
    y: getNumberFractional(139.70000, 139.80000, 5),
  }
};

// data for author
const avatar = [
  'img/avatars/user01.png',
  'img/avatars/user02.png',
  'img/avatars/user03.png',
  'img/avatars/user04.png',
  'img/avatars/user05.png',
  'img/avatars/user06.png',
  'img/avatars/user07.png',
  'img/avatars/user08.png',
];

// data for offer
const title = [
  'Лазурный рассвет',
  'Изумрудный оазис',
  'Небесная гавань',
  'Серебряный ветер',
  'Альпийская усадьба',
  'Золотой закат',
  'Тихое убежище',
  'Лунный причал',
  'Сказочный дворец',
  'Райский уголок'];

const address = new Array(10).fill(null).map(() => location())
// console.log(address);
// const address = location()

const price = [1500, 2000, 2500, 3000, 3500, 4000, 4500, 5000, 5500, 6000];

const type = ['palace', 'flat', 'house', 'hotel', 'bungalow'];

const typeTranslation = {
  flat: 'Квартира',
  bungalow: 'Бунгало',
  house: 'Дом',
  palace: 'Дворец',
  hotel: 'Отель',
};

const rooms = [1, 2, 3, 4, 5];

const guests = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const checkin = ['12:00', '13:00', '14:00'];

const checkout = ['12:00', '13:00', '14:00'];

const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];

const description = [
  'Уютный номер с видом на море.',
  'Просторный интерьер с современным дизайном.',
  'Тихое убежище с балконом и садом.',
  'Роскошный люкс с джакузи и камином.',
  'Комфорт и стиль в каждой детали.',
  'Номер с панорамным видом на горы.',
  'Минимализм и удобство для идеального отдыха.',
  'Теплый свет и мягкие кровати.',
  'Элегантный интерьер с видом на город.',
  'Уютный уголок для романтического вечера.',
];

const photos = [
  'http://o0.github.io/assets/images/tokyo/hotel1.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel2.jpg',
  'http://o0.github.io/assets/images/tokyo/hotel3.jpg',
];

export {
  avatar,
  typeTranslation,
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
};

