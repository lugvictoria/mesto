/**
 * Элементы страницы и их селекторы
 */

// Контейнер с карточками
export const cardsSelector = '.elements';
export const cardTemplateSelector = '#card';

export const profileName = document.querySelector('.profile__title');
export const profileJob = document.querySelector('.profile__subtitle');
export const profileEditButton = document.querySelector('.profile__button-edit');
export const profileEditPopupSelector = '.popup_profile-edit';
const profileEditPopupElement = document.querySelector(profileEditPopupSelector);

export const profileNameInput = profileEditPopupElement.querySelector('.popup__input_data_name');
export const profileJobInput = profileEditPopupElement.querySelector('.popup__input_data_profession');

export const newCardPopupSelector = '.popup_card-add';
const newCardPopupElement = document.querySelector('.popup_card-add');
export const newCardForm = newCardPopupElement.querySelector('.popup__form');
export const newCardTitle = newCardPopupElement.querySelector('.popup__input_place_name');
export const newCardLink = newCardPopupElement.querySelector('.popup__input_place_link');
export const newCardButton = document.querySelector('.profile__button-add');
export const newCardSaveButton = newCardPopupElement.querySelector('.popup__save-button');

export const cardsContainer = document.querySelector('.elements');
export const profileEditForm = profileEditPopupElement.querySelector('.popup__form');

//  кнопки закрытия popup'ов
export const popupCloseButtons = document.querySelectorAll('.popup__button-close');
export const popups = document.querySelectorAll('.popup');

export const imagePopupSelector = document.querySelector('.popup_picture');

export const imagePopupFigure = imagePopupSelector.querySelector('.popup__picture-image');
export const imagePopupCaption = imagePopupSelector.querySelector('.popup__picture-title');

/** Запуск валидации форм на странице */
export const enableValidation = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__save-button',
  inactiveButtonClass: 'popup__save-button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__input-error_visible'
};
