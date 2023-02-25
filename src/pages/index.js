import '../pages/index.css'
import initialCards from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

import Section from '../components/Section.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';

import {
  cardsSelector,
  cardTemplateSelector,
  profileName,
  profileJob,
  profileEditButton,
  profileEditPopupSelector,
  profileEditForm,
  profileNameInput,
  profileJobInput,
  newCardForm,
  newCardTitle,
  newCardLink,
  newCardButton,
  newCardSaveButton,
  newCardPopupSelector,
  cardsContainer,
  popupCloseButtons,
  popups,
  imagePopupSelector,
  imagePopupFigure,
  imagePopupCaption,
  enableValidation
} from '../utils/constants.js';

const cardPopupValidator = new FormValidator(enableValidation, '.popup__form-card');
cardPopupValidator.enableValidation();

const profilePopupValidator = new FormValidator(enableValidation, '.popup__form-profile');
profilePopupValidator.enableValidation();


function renderCard(data) {
  const card = new Card(data, cardTemplateSelector, handleCardClick);
  return card.generateCard();
}

function handleCardClick(imageLink, text) {
  imagePopup.open(imageLink, text);
}

// Инициализация классов
const cardsSection = new Section({
  items: initialCards,
  renderer: renderCard
}, cardsSelector);

// Вызов функций и методов при загрузке  страницы
cardsSection.renderItems();

const profileEditPopup = new PopupWithForm(profileEditPopupSelector, data => {
  const name = data.name;
  const job = data.profession;
  userInfo.setUserInfo(name,job);
  profileEditPopup.close();
});

const newCardPopup = new PopupWithForm(newCardPopupSelector, data => {
  cardsSection.addItem(renderCard(data));
  newCardPopup.close();
});

const imagePopup = new PopupWithImage('.popup_picture');

const userInfo = new UserInfo({
  nameElement: '.profile__title',
  jobElement: '.profile__subtitle',
});

// Установка  слушателей  событий
profileEditPopup.setEventListeners();

profileEditButton.addEventListener('click', function () {
  profilePopupValidator.clearForm();
  ({
    name: profileNameInput.value,
    job: profileJobInput.value
  } = userInfo.getUserInfo());
  profileEditPopup.open();
});

newCardPopup.setEventListeners();

newCardButton.addEventListener('click', function () {
cardPopupValidator.clearForm();
cardPopupValidator.disableButtonState();
  newCardPopup.open();
});

imagePopup.setEventListeners();

