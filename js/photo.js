// Загрузка изображения и создание превью
const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileChooserPhoto = document.querySelector('#images');
const adFormPhoto = document.querySelector('.ad-form__photo');

fileChooserPhoto.addEventListener('change', () => {
  const file = fileChooserPhoto.files[0];
  const fileName = file.name.toLowerCase();

  // В разметке нет тега img, создаю сам и прописываю атрибуты размеров исходя из div
  const previewPhoto = document.createElement('img');
  previewPhoto.width = 70;
  previewPhoto.height = 70;
  previewPhoto.alt = 'Фотография жилья';
  previewPhoto.style.borderRadius = '5px';
  adFormPhoto.append(previewPhoto);

  const matches = FILE_TYPES.some((it) => {
    return fileName.endsWith(it);
  });
  if (matches) {
    const reader = new FileReader();

    reader.addEventListener('load', () => {
      previewPhoto.src = reader.result;
    })

    reader.readAsDataURL(file);
  }
});

