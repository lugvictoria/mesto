let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__container');
let buttonEdit = document.querySelector('.profile__button-edit');
let popupClose = document.querySelector('.popup__button-close');
let inputName = form.querySelector('.popup__inputs_name');
let inputProfession = form.querySelector('.popup__inputs_profession');
let profileTitle = document.querySelector('.profile__title');
let userProfession = document.querySelector('.profile__subtitle');

// функция для открытия popup
function openPopup() {
  inputName.value = profileTitle.textContent;
  inputProfession.value = userProfession.textContent;
  popup.classList.add('popup__opened');
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
  popup.classList.remove('popup__opened');
}

buttonEdit.addEventListener('click', openPopup);
form.addEventListener('submit', formSave);
popupClose.addEventListener('click', closePopup);
