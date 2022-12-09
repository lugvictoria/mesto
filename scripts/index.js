let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__container');
let buttonEdit = document.querySelector('.profile__button-edit');
let buttonSave = document.querySelector('.popup__form');
let popupClose = document.querySelector('.popup__button-close');
let inputName = document.querySelector('.popup__inputs_name');
let inputProffession = document.querySelector('.popup__inputs_proffession');
let gname = document.querySelector('.profile__title');
let proffession = document.querySelector('.profile__subtitle');

// функция для открытия popup
function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = gname.textContent;
  inputProffession.value = proffession.textContent;
}
// функция работы с формой
function formSave(evt) {
  evt.preventDefault();
  gname.textContent = inputName.value;
  proffession.textContent = inputProffession.value;
  closePopup();
}
// функция для закрытия popup
function closePopup() {
  popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', openPopup);
buttonSave.addEventListener('submit', formSave);
popupClose.addEventListener('click', closePopup);
