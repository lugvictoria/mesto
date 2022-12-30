let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__container');
const buttonEdit = document.querySelector('.profile__button-edit');
let popupClose = document.querySelector('.popup__button-close');
let inputName = form.querySelector('.popup__inputs_data_name');
let inputProfession = form.querySelector('.popup__inputs_data_profession');
const profileTitle = document.querySelector('.profile__title');
let userProfession = document.querySelector('.profile__subtitle');

// функция для открытия popup (нескольких)
function openPopup(popup) {
  inputName.value = profileTitle.textContent;
  inputProfession.value = userProfession.textContent;
  popup.classList.add('popup_opened');
}

// функция для закрытия popup (нескольких)
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

buttonEdit.addEventListener('click', openPopup);
form.addEventListener('submit', formSave);
popupClose.addEventListener('click', closePopup);

// открытие popup для внесения данных в карточку места
let popupPic = document.querySelector('.popup-pic');
let formPic = document.querySelector('.popup-pic__container');
let popupClosePic = document.querySelector('.popup-pic__button-close');
const buttonAdd = document.querySelector('.profile__button-add');

// создание карточек
const popupEditProfile = document.querySelector('#popup_profile-edit');
const popupAddCard = document.querySelector('#popup_card-add');
const cardContainer = document.querySelector('.elements');
const userTemplate = document.querySelector('#template').content;
const profileSubtitle = document.querySelector('.profile__subtitle');
const buttonDelete = document.querySelector('.card__delete-button');

// воссоздание массива initialCards
initialCards.forEach(object => {
  const elementCard = userTemplate.querySelector('.card').cloneNode(true);
  createCard(elementCard);
  elementCard.querySelector('.card__image').alt = '$(name).';
  elementCard.querySelector('.card__image').src = object.link;
  elementCard.querySelector('.card__title').textContent = object.name;
  return cardContainer.prepend(elementCard);
});

// функция открытия popupEditProfile
function openPopupEditProfile() {
  const popupButtonClose = popupEditProfile.querySelector('.popup__button-close');
  const popupButtonSave = popupEditProfile.querySelector('.popup__form');
  openPopup(popupEditProfile);
  const inputName = popupEditProfile.querySelector('.popup__inputs_data_name');
  const inputHobby = popupEditProfile.querySelector('.popup__inputs_data_profession');
  inputName.value = profileTitle.textContent;
  inputHobby.value = profileSubtitle.textContent;
  popupButtonClose.addEventListener('click', () => {
    closePopup(popupEditProfile);
  });
  function submitPopupEditProfile(evt) {
    evt.preventDefault();
    profileTitle.textContent = inputTitle.value;
    profileSubtitle.textContent = inputHobby.value;
    closePopup(popupEditProfile);
  }
  popupButtonSave.addEventListener('submit', submitPopupEditProfile);
}
buttonEdit.addEventListener('click', openPopupEditProfile);

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
buttonAdd.addEventListener('click', openPopupAddCard);

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
    let popupImage = document.querySelector('.popup-picture');
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


