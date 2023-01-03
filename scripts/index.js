// определение констант popup'ов по ID
const popupEditProfile = document.getElementById('popup_profile-edit');
const popupAddCard = document.getElementById('popup_card-add');
const popupImage = document.getElementById('popup-picture');

// константы кнопок
const buttonAdd = document.querySelector('.profile__button-add');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonDelete = document.querySelector('.card__delete-button');

//  кнопки закрытия popup'ов
const buttonCloseProfile = popupEditProfile.querySelector('.popup__button-close');
const buttonCloseCard = popupAddCard.querySelector('.popup__button-close');
const buttonClosePicture = popupImage.querySelector('.popup-picture__button-close');

//  кнопки сохранения popup'ов
const buttonSaveProfile = popupEditProfile.querySelector('.popup__button-save');
const buttonSaveCard = popupAddCard.querySelector('.popup__form');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popupEditProfileContainer = popupEditProfile.querySelector('.popup__container');
const inputName = popupEditProfile.querySelector('.popup__inputs_data_name');
const inputProfession = popupEditProfile.querySelector('.popup__inputs_data_profession');

const popupPictureContainer = document.querySelector('.popup-picture__container');

// создание карточек
const cardContainer = document.querySelector('.elements');
const userTemplate = document.querySelector('#template').content;

// функция для открытия popup'ов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// функция для закрытия popup'ов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// функция работы с формой введения данных в профиль
function EditProfile(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputProfession.value;
  closePopup(popupEditProfile);
}

// воссоздание массива initialCards
initialCards.forEach(object => {
  const elementCard = userTemplate.querySelector('.card').cloneNode(true);
  createCard(elementCard);
  elementCard.querySelector('.card__image').alt = '$(name).';
  elementCard.querySelector('.card__image').src = object.link;
  elementCard.querySelector('.card__title').textContent = object.name;
  cardContainer.prepend(elementCard);
});

// функция открытия PopupEditProfile
function openPopupEditProfile() {
  openPopup(popupEditProfile);
  inputName.value = profileTitle.textContent;
  inputProfession.value = profileSubtitle.textContent;
  buttonCloseCard.addEventListener('click', () => {
    closePopup(popupEditProfile);
  });
  EditProfile(evt);
  buttonSaveProfile.addEventListener('submit', popupEditProfile);
}

// функция открытие popupAddCard
function openPopupAddCard() {
  openPopup(popupAddCard);


  const card = userTemplate.querySelector('.card').cloneNode('true');
  const inputName = popupAddCard.querySelector('.popup__inputs_data_name');
  const inputProfession = popupAddCard.querySelector('.popup__inputs_data_profession');
  buttonCloseCard.addEventListener('click', () => {
    closePopup(popupAddCard);
  });
  buttonSaveCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    createCard(card);
    card.querySelector('.card__image').src = inputProfession.value;
    card.querySelector('.card__title').textContent = inputName.value;
    card.querySelector('.card__image').alt = 'изображение' + inputName.value;
    inputName.value = '';
    inputProfession.value = '';
    const firstChild = cardContainer.firstChild;
    cardContainer.insertBefore(card, firstChild);
    closePopup(popupAddCard);
  });
}

// функция createCard и функция поставить лайк внутри
function createCard(card) {
  const buttonLike = card.querySelector('.card__like-button');
  function createLike() {
    const buttonLike = card.querySelector('.card__like-button');
    buttonLike.classList.toggle('card__like-button_active');
  }
  buttonLike.addEventListener('click', createLike);
  const cardImage = card.querySelector('.card__image');
  function openPopupImage() {
    document.querySelector('.popup-picture__image').src = card.querySelector('.card__image').src;
    document.querySelector('.popup-picture__title').textContent = card.querySelector('.card__title').textContent;

    popupImage.classList.toggle('popup-picture_opened');
    const buttonClosePopupImage = document.querySelector('.popup-picture__button-close');
    buttonClosePopupImage.addEventListener('click', () => {
      popupImage.classList.remove('popup-picture_opened');
    });
  }
  cardImage.addEventListener('click', openPopupImage);
  const buttonDelete = card.querySelector('.card__delete-button');
  function removeCard() {
    card.remove();
  }
  buttonDelete.addEventListener('click', removeCard);

  return card;
}

// слушатели и обработчики
buttonEdit.addEventListener('click', openPopupEditProfile);
buttonAdd.addEventListener('click', openPopupAddCard);
buttonCloseProfile.addEventListener('click', closePopup(popupEditProfile));
buttonCloseCard.addEventListener('click', closePopup(popupAddCard));
buttonClosePicture.addEventListener('click', closePopup(popupImage));
popupEditProfileContainer.addEventListener('submit', EditProfile);
