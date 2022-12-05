let popup = document.querySelector('.popup');
let form = document.querySelector('.popup__container');
let buttonEdit = document.querySelector('.profiles__buttons-edit');
let buttonSave = document.querySelector('.popup__form');
let popupClose = document.querySelector('.popup__buttons-close');
let inputName = document.querySelector('.popup__inputs_type_name');
let inputHobby = document.querySelector('.popup__inputs_type_hobby');
let gname = document.querySelector('.profiles__name');
let hobby = document.querySelector('.profiles__subtitle');

// функция для открытия popup
function openPopup() {
  popup.classList.add('popup_opened');
  inputName.value = gname.textContent;
  inputHobby.value = hobby.textContent;
}
// функция работы с формой
function formSave(evt) {
  evt.preventDefault();
  gname.textContent = inputName.value;
  hobby.textContent = inputHobby.value;
  closePopup();
}
// функция для  закрытия popup
function closePopup() {
  popup.classList.remove('popup_opened');
}

buttonEdit.addEventListener('click', openPopup);
buttonSave.addEventListener('submit', formSave);
popupClose.addEventListener('click', closePopup);