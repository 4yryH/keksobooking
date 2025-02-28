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

export {getRandomNumber, getNumberFractional, getRandomUniqueElement, getRandomArrayElement};
