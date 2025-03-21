// Фильтр объявлений на карте
const filterAdvertisements = (advertisements, filters) => {
  return advertisements.filter((advertisement) => {
    // Фильтр по типу жилья
    const matchesType = filters.type === 'any' || advertisement.offer.type === filters.type;

    // Фильтр по цене
    const price = advertisement.offer.price;
    let matchesPrice = true;
    if (filters.price === 'low') {
      matchesPrice = price < 10000;
    } else if (filters.price === 'middle') {
      matchesPrice = price >= 10000 && price <= 50000;
    } else if (filters.price === 'high') {
      matchesPrice = price > 50000;
    }

    // Фильтр по количеству комнат
    const matchesRooms = filters.rooms === 'any' || advertisement.offer.rooms === parseInt(filters.rooms, 10);

    // Фильтр по количеству гостей
    const matchesGuests = filters.guests === 'any' || advertisement.offer.guests === parseInt(filters.guests, 10);

    // Фильтр по удобствам
    let matchesFeatures = true;
    if (filters.features.length > 0) {
      // Проверяем, что у объявления есть поле features
      if (advertisement.offer.features && advertisement.offer.features.length > 0) {
        matchesFeatures = filters.features.every((feature) => advertisement.offer.features.includes(feature));
      } else {
        matchesFeatures = false; // Если у объявления нет удобств, оно не подходит
      }
    }

    return matchesType && matchesPrice && matchesRooms && matchesGuests && matchesFeatures;
  });
};

export { filterAdvertisements };
