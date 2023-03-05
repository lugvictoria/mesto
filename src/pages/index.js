import "../pages/index.css";

import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";

import Section from "../components/Section.js";
import PopupWithImage from "../components/PopupWithImage.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupDelete from "../components/PopupDelete";
import UserInfo from "../components/UserInfo.js";

import Api from "../components/Api";
import { changeButtonText } from "../utils/utils";

import {
  cardsSelector,
  profileEditButton,
  profileEditPopupSelector,
  profileNameInput,
  profileJobInput,
  newCardButton,
  newCardPopupSelector,
  enableValidation,
  changeAvatar,
} from "../utils/constants.js";

const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-60",
  headers: {
    authorization: "fc2169ac-40f3-4626-a69d-9bd39655e7bd",
    "Content-Type": "application/json",
  },
});

const imagePopup = new PopupWithImage(".popup_picture");
const avatarPopup = new PopupWithForm(".popup_avatar", avatarHandler);
const deletePopup = new PopupDelete(".popup_delete", deleteHandler);

const userInfo = new UserInfo({
  nameElement: ".profile__title",
  jobElement: ".profile__subtitle"
}, ".profile__avatar-image");

const cardsSection = new Section((item, userId) => {
  const cardItem = renderCard(item, userId);
  cardsSection.addItem(cardItem);
}, cardsSelector);

const profileEditPopup = new PopupWithForm(
  profileEditPopupSelector,
  profileSubmitHandler
);

const newCardPopup = new PopupWithForm(newCardPopupSelector, cardSubmitHandler);

const profilePopupValidator = new FormValidator(
  enableValidation,
  ".popup__form-profile"
);
profilePopupValidator.enableValidation();
const cardPopupValidator = new FormValidator(
  enableValidation,
  ".popup__form-card"
);
cardPopupValidator.enableValidation();
const avatarPopupValidator = new FormValidator(
  enableValidation,
  ".popup_avatar"
);
avatarPopupValidator.enableValidation();

function avatarHandler(value, submitButton) {
  const originalButtonText = submitButton.textContent;
  changeButtonText(submitButton, "Loading...");

  api
    .setAvatar(value.avatarURL)
    .then((res) => {
      userInfo.setAvatar(res.avatar);

      avatarPopupValidator.clearForm();
      avatarPopup.close();
    })
    .catch((e) => console.log(e))
    .finally(() => changeButtonText(submitButton, originalButtonText));
}

function deleteHandler(element, elementId, submitButton) {
  const originalButtonText = submitButton.textContent;
  changeButtonText(submitButton, "Loading...");
  api
    .removeCard(elementId)
    .then(() => {
      element.remove();
      element = null;
      this.close();
    })
    .catch((e) => console.log("Delete Error: ", e))
    .finally(() => changeButtonText(submitButton, originalButtonText));
}

function openPopupDelete(element, elementId) {
  deletePopup.open(element, elementId);
}

function renderCard(data, userId) {
  const card = new Card(
    data,
    { withBasket: "#card", withoutBasket: "#cardWithoutBasket" },
    handleCardClick,
    openPopupDelete,
    clickLikeClick,
    userId
  );
  return card.generateCard();
}

function clickLikeClick(element, elementId, isLiked) {
  if (isLiked) {
    api
      .removeLike(elementId)
      .then((update) => {
        element.updateLikesCount(update.likes.length);
        element.changeLikeColor();
      })
      .catch((err) => console.log("Remove Like Error: ", err));
  } else {
    api
      .addLike(elementId)
      .then((update) => {
        element.updateLikesCount(update.likes.length);
        element.changeLikeColor();
      })
      .catch((err) => console.log("Add Like Error: ", err));
  }
}

function handleCardClick(imageLink, text) {
  imagePopup.open(imageLink, text);
}

function profileSubmitHandler(value, submitButton) {
  const originalButtonText = submitButton.textContent;
  changeButtonText(submitButton, "Loading...");

  api
    .setUserInfo(value.name, value.profession)
    .then((user) => {
      userInfo.setUserInfo(user);

      profileEditPopup.close();
    })
    .catch((e) => console.log(e))
    .finally(() => changeButtonText(submitButton, originalButtonText));
}

function cardSubmitHandler(value, submitButton) {
  const originalButtonText = submitButton.textContent;
  changeButtonText(submitButton, "Loading...");

  const newCard = {
    name: value.name,
    link: value.link,
  };

  api
    .addCard(newCard)
    .then((res) => {
      const cardItem = renderCard(res, userInfo.id);
      cardsSection.addItem(cardItem);

      cardPopupValidator.clearForm();
      newCardPopup.close();
    })
    .catch((e) => console.log(e))
    .finally(() => changeButtonText(submitButton, originalButtonText));
}

profileEditButton.addEventListener("click", function () {
  profilePopupValidator.clearForm();
  ({ name: profileNameInput.value, job: profileJobInput.value } =
    userInfo.getUserInfo());
  profileEditPopup.open();
});

newCardButton.addEventListener("click", function () {
  cardPopupValidator.clearForm();
  cardPopupValidator.disableButtonState();
  newCardPopup.open();
});

Promise.all([api.getInitialCards(), api.getUserInfo()])
  .then((res) => {
    const initialCards = res[0];
    const user = res[1];

    userInfo.setAvatar(user.avatar);
    userInfo.setUserInfo(user);
    userInfo.id = user._id;

    cardsSection.renderItems(initialCards.reverse(), userInfo.id);
  })
  .catch((e) => console.log(e));

changeAvatar.addEventListener("click", () => {
  avatarPopupValidator.clearForm();
  avatarPopupValidator.disableButtonState();
  avatarPopup.open();
});
