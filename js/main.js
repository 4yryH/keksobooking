/**
 Функция, возвращающая случайное целое число из переданного диапазона включительно.
 Учтите, что диапазон может быть только положительный, включая ноль. А также придумайте,
 как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.
 */

const getRandomNumber = function (minNumber = 0, maxNumber = 100, attempts = 1) {
  if (minNumber < 0 || maxNumber < 0) {
    return 'Задайте диапазон с положительными числами!';
  }

  if (minNumber === maxNumber) {
    return 'Вы задали одинаковые числа начала и конца диапазона';
  }

  if (minNumber > maxNumber) {
    [minNumber, maxNumber] = [maxNumber, minNumber];
  }

  let setOfNumber = [];
  for (let i = 0; i < attempts; i++) {
    let someNumber = Math.floor(Math.random() * (maxNumber - minNumber + 1)) + minNumber;
    setOfNumber.push(someNumber);
  }

  return `Набор случайных чисел: ${setOfNumber}, в диапазоне от: ${minNumber} до ${maxNumber}`;
}

getRandomNumber();

/**
 Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно.
 Будет использоваться для генерации временных географических координат в следующем задании.
 Учтите, что диапазон может быть только положительный, включая ноль. А также придумайте,
 как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.
 Не забудьте, что в случае с дробными числами диапазон может быть в десятых, сотых, тысячных и т. д. долях.
 Например, 1.1, 1.2 — корректный диапазон.
 */

const getNumberFractional = function (minNumber = 0, maxNumber = 100, decimals = 2, attempts = 1) {
  if (minNumber < 0 || maxNumber < 0) {
    return 'Задайте диапазон с положительными числами!';
  }

  if (minNumber === maxNumber) {
    return 'Вы задали одинаковые числа начала и конца диапазона';
  }

  if (minNumber > maxNumber) {
    [minNumber, maxNumber] = [maxNumber, minNumber];
  }

  let setOfNumber = [];
  for (let i = 0; i < attempts; i++) {
    let someNumber = (Math.random() * (maxNumber - minNumber) + minNumber).toFixed(decimals);
    setOfNumber.push(parseFloat(someNumber));
  }
  return `Набор случайных чисел: ${setOfNumber}, в диапазоне от: ${minNumber} до ${maxNumber}`;
}

getNumberFractional();
