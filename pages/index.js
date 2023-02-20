import initialCards from '../utils/initialCards.js';
import Card from '../components/Card.js';
import FormValidator from '../components/FormValidator.js';

import Section from '../components/Section.js';
import {
  cardsSelector,
  cardTemplateSelector,
} from '../utils/constants.js';

/** import {
  cardsSelector,
  cardTemplateSelector,
  formSelector,
  inputSelector,
  submitButtonSelector,
  inactiveButtonClass,
  inputErrorClass,
  errorClass,


  profileEditPopupSelector,

  profileName,
  profileJob,
  profileEditButton,
  profileNameInput,
  profileJobInput,
  newCardButton,
  newCardForm,

  newCardPopupSelector,
  imagePopupSelector
} from '../utils/constants.js';
import initialCards from '../utils/initialCards.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import './index.css'; // импорт css-стилей для сборки в Webpack /** */



/** Элементы страницы */
const profileEditButton = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const cardsContainer = document.querySelector('.elements');

const profileEditPopup = document.getElementById('popup_profile-edit');
const profileEditForm = profileEditPopup.querySelector('.popup__form');
const profileNameInput = profileEditPopup.querySelector('.popup__input_data_name');
const profileJobInput = profileEditPopup.querySelector('.popup__input_data_profession');

const newCardPopup = document.getElementById('popup_card-add');
const newCardForm = newCardPopup.querySelector('.popup__form');
const newCardTitle = newCardPopup.querySelector('.popup__input_place_name');
const newCardLink = newCardPopup.querySelector('.popup__input_place_link');
const newCardButton = document.querySelector('.profile__button-add');
const newCardSaveButton = newCardPopup.querySelector('.popup__save-button');

export const imagePopup = document.getElementById('popup__picture');
export const imagePopupFigure = imagePopup.querySelector('.popup__picture-image');
export const imagePopupCaption = imagePopup.querySelector('.popup__picture-title');

//  кнопки закрытия popup'ов
const popupCloseButtons = document.querySelectorAll('.popup__button-close');
const popups = document.querySelectorAll('.popup');

const formValidators = {}; // Экземпляры класса FormValidator, чтобы снаружи обращаться к их методам

/** Функция открывает нужный попап */
export function openPopup (popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKey);
}

/** Функция закрывает нужный попап */
function closePopup (popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keydown', closePopupByKey);
}

/** Обработчик для закрытия попапов по кнопке Esc */
function closePopupByKey (evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

/** Функция сохраняет введенные данные (профиль пользователя) и закрывает попап */
function saveProfileInfo (event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup (profileEditPopup);
}

/** Функция сохраняет введенные данные (добавление карточки) и закрывает попап */
function saveNewCard (event) {
  event.preventDefault();

  const card = {
    name: newCardTitle.value,
    link: newCardLink.value
  };

  renderCard(cardsContainer, card);
  closePopup(newCardPopup);
  newCardForm.reset();
  formValidators[newCardForm.name].disableButtonState();
}

// Инициализация классов
const cardsSection = new Section({
  items: initialCards,
  renderer: renderCard
}, cardsSelector);


/** Обработчики событий */
profileEditButton.addEventListener('click', function () {
  profileNameInput.value = profileName.textContent;
  profileNameInput.dispatchEvent(new Event('input'));
  profileJobInput.value = profileJob.textContent;
  profileJobInput.dispatchEvent(new Event('input'));
  openPopup(profileEditPopup);
});
profileEditForm.addEventListener('submit', saveProfileInfo);

newCardButton.addEventListener('click', function () {
  openPopup(newCardPopup);
});
newCardForm.addEventListener('submit', saveNewCard);

popupCloseButtons.forEach( button => button.addEventListener('click', evt => {
  const popup = evt.target.closest('.popup');
  closePopup(popup);
}) );

popups.forEach( popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target === evt.currentTarget) closePopup(evt.target);
  });
});

/** Функция добавляет карточку на страницу
 *
 * Аргументы:
 * - контейнер для вставки,
 * - объект с карточкой
 * {  name: Строка с именем объекта (заголовок карточки),
 *    link: Строка с полным адресом изображения   }
 *
 * Шаблон карточки для генерации:
 * блок <template id="card">
 */
function renderCard (container, cardData) {
  container.prepend(getCardElement(cardData));
  console.log(cardData);
}

/** Функция создает новый элемент карточки по ее содержанию */
function getCardElement (cardData) {
  const card = new Card(cardData, '#card'); // переменная card - экземпляр класса Card

  return card.generateCard();
}

/** Отобразить исходные карточки при загрузке страницы */
initialCards.forEach(card => renderCard (cardsContainer, card));


/** Функция запускает валидацию всех форм на странице */
function validateForms (formClasses) {
  const formElements = Array.from(document.querySelectorAll(formClasses.formSelector));
  formElements.forEach( formElement => {
    const form = new FormValidator(formClasses, formElement);
    formValidators[formElement.getAttribute('name')] = form;
    form.enableValidation();
  });
}

/** Запустить валидацию форм на странице */
validateForms({
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
});
