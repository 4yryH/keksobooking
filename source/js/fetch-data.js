const fetchAdvertisements = async () => {
  const response = await fetch('https://23.javascript.htmlacademy.pro/keksobooking/data');
  if (!response.ok) {
    throw new Error('Не удалось загрузить данные');
  }
  return response.json();
};

export {fetchAdvertisements};
