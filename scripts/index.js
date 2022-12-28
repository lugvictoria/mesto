let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__container');
let buttonEdit = document.querySelector('.profile__button-edit');
let popupClose = document.querySelector('.popup__button-close');
let inputName = form.querySelector('.popup__inputs_data_name');
let inputProfession = form.querySelector('.popup__inputs_data_profession');
let profileTitle = document.querySelector('.profile__title');
let userProfession = document.querySelector('.profile__subtitle');

// функция для открытия popup
function openPopup() {
  inputName.value = profileTitle.textContent;
  inputProfession.value = userProfession.textContent;
  popup.classList.add('popup_opened');
}
// функция работы с формой введения данных в профиль
function formSave(evt) {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  userProfession.textContent = inputProfession.value;
  closePopup();
}
// функция для закрытия popup
function closePopup() {
  popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', openPopup);
form.addEventListener('submit', formSave);
popupClose.addEventListener('click', closePopup);

// открытие popup для внесения данных в карточку места

let popupPic = document.querySelector('.popup-pic');
let formPic = document.querySelector('.popup-pic__container');
let popupClosePic = document.querySelector('.popup-pic__button-close');
let buttonAdd = document.querySelector('.profile__button-add');

// функция для открытия popup-pic
function openPopupPic() {
  inputName.value = profileTitle.textContent;
  inputProfession.value = userProfession.textContent;
  popupPic.classList.add('popup-pic_opened');
}

// функция для закрытия popup-pic
function closePopupPic() {
  popupPic.classList.remove('popup-pic_opened');
}

buttonAdd.addEventListener('click', openPopupPic);
popupClosePic.addEventListener('click', closePopupPic);
// создание карточек

const cardContainer = document.querySelector('.elements');
const userTemplate = document.querySelector('#template').content;

// отрисовка массива
initialCards.forEach(object => {
  const elementCard = userTemplate.querySelector('.card').cloneNode(true);

  elementCard.querySelector('.card__image').alt = '$(name).';
  elementCard.querySelector('.card__image').src = object.link;
  elementCard.querySelector('.card__title').textContent = object.name;
  return cardContainer.prepend(elementCard);
});
/*
let buttonLike = elementCard.querySelector('.card__like-button');
function like() {
  const buttonLike = elementCard.querySelector('.card__like-button');
  buttonLike.classList.toggle('card__like-button_active');
}
buttonLike.addEventListener('click', like);*/







