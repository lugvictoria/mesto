let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__container');
let buttonEdit = document.querySelector('.profile__button-edit');
let popupClose = document.querySelector('.popup__button-close');
let inputName = form.querySelector('.popup__inputs_data_name');
let inputProfession = form.querySelector('.popup__inputs_data_profession');
let profileTitle = document.querySelector('.profile__title');
let userProfession = document.querySelector('.profile__subtitle');

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

// функция для открытия popup
function openPopup() {
  inputName.value = profileTitle.textContent;
  inputProfession.value = userProfession.textContent;
  popup.classList.add('popup_opened');
}
// функция работы с формой
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
