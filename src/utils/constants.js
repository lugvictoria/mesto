/**
 * Элементы страницы и их селекторы
 */

// Контейнер с карточками
export const cardsSelector = ".elements";

export const profileEditButton = document.querySelector(
  ".profile__button-edit"
);
export const profileEditPopupSelector = ".popup_profile-edit";
const profileEditPopupElement = document.querySelector(
  profileEditPopupSelector
);

export const profileNameInput = profileEditPopupElement.querySelector(
  ".popup__input_data_name"
);
export const profileJobInput = profileEditPopupElement.querySelector(
  ".popup__input_data_profession"
);

export const newCardPopupSelector = ".popup_card-add";
export const newCardButton = document.querySelector(".profile__button-add");

export const profileAvatar = document.querySelector(".profile__avatar-image");
export const changeAvatar = document.querySelector(".profile__avatar-button");

/** Запуск валидации форм на странице */
export const enableValidation = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__save-button",
  inactiveButtonClass: "popup__save-button_disabled",
  inputErrorClass: "popup__input_type_error",
  inputErrors: ".popup__input-error",
  errorClass: "popup__input-error_visible",
};
