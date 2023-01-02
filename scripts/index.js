const popup = document.querySelector('.popup');
const form = document.querySelector('.popup__container');
const popupClose = document.querySelector('.popup__button-close');
const inputName = form.querySelector('.popup__inputs_data_name');
const inputProfession = form.querySelector('.popup__inputs_data_profession');
const profileTitle = document.querySelector('.profile__title');
const userProfession = document.querySelector('.profile__subtitle');

// константы кнопок
const buttonAdd = document.querySelector('.profile__button-add');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonDelete = document.querySelector('.card__delete-button');

// константы popup'ов по ID
const PopupEditProfile = document.getElementById('popup_profile-edit');
const popupAddCard = document.getElementById('popup_card-add');
const popupImage = document.getElementById('popup-picture');

// создание карточек
const cardContainer = document.querySelector('.elements');
const userTemplate = document.querySelector('#template').content;
const profileSubtitle = document.querySelector('.profile__subtitle');

// открытие popup для внесения данных в карточку места

const formPic = document.querySelector('.popup-picture__container');
const popupClosePic = document.querySelector('.popup-picture__button-close');

// функция для открытия popup'ов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// функция для закрытия popup'ов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// функция работы с формой введения данных в профиль
function formSave(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  userProfession.textContent = inputProfession.value;
  closePopup();
}

// слушатели
buttonEdit.addEventListener('click', openPopupEditProfile);
buttonAdd.addEventListener('click', openPopupAddCard);
form.addEventListener('submit', formSave);
popupClose.addEventListener('click', closePopup(PopupEditProfile));

// воссоздание массива initialCards
initialCards.forEach(object => {
  const elementCard = userTemplate.querySelector('.card').cloneNode(true);
  createCard(elementCard);
  elementCard.querySelector('.card__image').alt = '$(name).';
  elementCard.querySelector('.card__image').src = object.link;
  elementCard.querySelector('.card__title').textContent = object.name;
  return cardContainer.prepend(elementCard);
});

// функция открытия PopupEditProfile
function openPopupEditProfile() {
  openPopup(PopupEditProfile);
  const popupButtonSave = PopupEditProfile.querySelector('.popup__form');
  const popupButtonClose = PopupEditProfile.querySelector('.popup__button-close');
  const inputName = PopupEditProfile.querySelector('.popup__inputs_data_name');
  const inputHobby = PopupEditProfile.querySelector('.popup__inputs_data_profession');
  inputName.value = profileTitle.textContent;
  inputHobby.value = profileSubtitle.textContent;
  popupButtonClose.addEventListener('click', () => {
    closePopup(PopupEditProfile);
  });
  function submitPopupEditProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = inputTitle.value;
    profileSubtitle.textContent = inputHobby.value;
    closePopup(PopupEditProfile);
  }
  popupButtonSave.addEventListener('submit', PopupEditProfile);
}

// функция открытие popupAddCard
function openPopupAddCard() {
  openPopup(popupAddCard);
  const popupButtonSave = popupAddCard.querySelector('.popup__form');
  const popupButtonClose = popupAddCard.querySelector('.popup__button-close');
  const card = userTemplate.querySelector('.card').cloneNode('true');
  const inputName = popupAddCard.querySelector('.popup__inputs_data_name');
  const inputHobby = popupAddCard.querySelector('.popup__inputs_data_profession');
  popupButtonClose.addEventListener('click', () => {
    closePopup(popupAddCard);
  });
  popupButtonSave.addEventListener('submit', (evt) => {
    evt.preventDefault();
    createCard(card);
    card.querySelector('.card__image').src = inputHobby.value;
    card.querySelector('.card__title').textContent = inputName.value;
    card.querySelector('.card__image').alt = 'изображение' + inputName.value;
    inputHobby.value = '';
    inputName.value = '';
    const firstChild = cardContainer.firstChild;
    cardContainer.insertBefore(card, firstChild);
    closePopup(popupAddCard);
  });
}

// функция createCard и функция поставить лайк внутри
function createCard(card) {
  let buttonLike = card.querySelector('.card__like-button');
  function like() {
    const buttonLike = card.querySelector('.card__like-button');
    buttonLike.classList.toggle('card__like-button_active');
  }
  buttonLike.addEventListener('click', like);
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
