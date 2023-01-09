/** Элементы страницы */
const profileEditButton = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const newCardButton = document.querySelector('.profile__button-add');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.getElementById('cards').content;

const profileEditPopup = document.getElementById('popup_profile-edit');
const profileEditForm = profileEditPopup.querySelector('.popup__button-save');
const profileNameInput = profileEditPopup.querySelector('.popup__inputs_data_name');
const profileJobInput = profileEditPopup.querySelector('.popup__inputs_data_profession');

const newCardPopup = document.getElementById('popup_card-add');
const newCardForm = newCardPopup.querySelector('.popup__form');
const newCardSaveButton = newCardPopup.querySelector('.popup__button-save');
const newCardTitle = newCardPopup.querySelector('.popup__inputs_place_name');
const newCardLink = newCardPopup.querySelector('.popup__inputs_place_link');

const imagePopup = document.getElementById('popup-picture');
const imagePopupFigure = imagePopup.querySelector('.popup-picture__image');
const imagePopupCaption = imagePopup.querySelector('.popup-picture__title');

const popupCloseButtons = document.querySelectorAll('.popup__button-close');

/** Функция добавляет карточку/карточки на страницу
 *
 * Аргументы:
 * - контейнер для вставки,
 * - один или несколько объектов с карточкой (при вставке массива с объектами использовать spread-оператор, например: ...arrayOfObjects)
 *
 * Ожидаемый формат объекта карточки:
 * {  name: Строка с именем объекта (заголовок карточки),
 *    link: Строка с полным адресом изображения   }
 *
 * Шаблон карточки для генерации:
 * блок <template id="cards">
 */
function renderCards (container, ...cards) {
  cards.forEach( card => {
    container.prepend( getNewCard(card.name, card.link) );
  });
}

/** Функция создает из шаблона элемент с новой карточкой и возвращает его */
 function getNewCard (name, link) {
  // Создание элемента из шаблона
  const card = cardTemplate.querySelector('.card').cloneNode(true);

  // Заполнение содержимого
  card.querySelector('.card__image').src = link;
  card.querySelector('.card__image').alt = name;
  card.querySelector('.card__title').textContent = name;

  // Обработчики нажатий
  card.querySelector('.card__image').addEventListener('click', showImagePopup);
  card.querySelector('.card__like-button').addEventListener('click', likeCard);
  card.querySelector('.card__delete-button').addEventListener('click', deleteCard);

  return card;
}

/** Функция нажатия на лайк */
function likeCard (event) {
  event.target.closest('.card__like-button').classList.toggle('card__like-button_active');
}

/** Функция удаления карточки при нажатии на кнопку */
function deleteCard (event) {
  event.target.closest('.card').remove();
}

/** Функция открывает нужный попап */
function openPopup (popup) {
  popup.classList.add('popup_opened');
}

/** Функция закрывает текущий попап */
function closePopup (event) {
  event.target.closest('.popup').classList.remove('popup_opened');
}

/** Функция сохраняет введенные данные и закрывает попап */
function saveProfileInfo (event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup (event);
}

/** Функция сохраняет введенные данные и закрывает попап */
function saveNewCard (event) {
  event.preventDefault();
  const card = {
    name: newCardTitle.value,
    link: newCardLink.value
  };
  renderCards(cardsContainer, card);
  closePopup(event);
  newCardForm.reset();
}

/** Функция открывает попап с увеличенной картинкой */
function showImagePopup (event) {
  imagePopupFigure.src = event.target.src;
  imagePopupFigure.alt = event.target.alt;
  imagePopupCaption.textContent = event.target.closest('.card').querySelector('.card__title').textContent;
  console.log(profileName.textContent);
  openPopup(imagePopup);
}

/** Обработчики событий */
profileEditButton.addEventListener('click', function () {
  profileNameInput.value = profileName.textContent;
  profileJobInput.value = profileJob.textContent;
  openPopup(profileEditPopup);
});
profileEditForm.addEventListener('submit', saveProfileInfo );


newCardButton.addEventListener('click', function () {
  openPopup(newCardPopup);
});

newCardForm.addEventListener('submit', saveNewCard);

popupCloseButtons.forEach(button => button.addEventListener('click', closePopup));

/** Отобразить исходные карточки при загрузке страницы */
renderCards(cardsContainer, ...initialCards);





















































/*
// определение констант popup'ов по ID
const popupEditProfile = document.getElementById('popup_profile-edit');
const popupAddCard = document.getElementById('popup_card-add');
const popupImage = document.getElementById('popup-picture');

// константы кнопок
const buttonAdd = document.querySelector('.profile__button-add');
const buttonEdit = document.querySelector('.profile__button-edit');
const buttonDelete = document.querySelector('.card__delete-button');

//  кнопки закрытия popup'ов
const buttonCloseProfile = popupEditProfile.querySelector('.popup__button-close');
const buttonCloseCard = popupAddCard.querySelector('.popup__button-close');
const buttonClosePicture = popupImage.querySelector('.popup-picture__button-close');

//  кнопки сохранения popup'ов
const buttonSaveProfile = popupEditProfile.querySelector('.popup__button-save');
const buttonSaveCard = popupAddCard.querySelector('.popup__form');

const profileTitle = document.querySelector('.profile__title');
const profileSubtitle = document.querySelector('.profile__subtitle');

const popupEditProfileContainer = popupEditProfile.querySelector('.popup__container');
const inputName = popupEditProfile.querySelector('.popup__inputs_data_name');
const inputProfession = popupEditProfile.querySelector('.popup__inputs_data_profession');
const popupPictureContainer = document.querySelector('.popup-picture__container');

// создание карточек
const cardContainer = document.querySelector('.elements');
const userTemplate = document.querySelector('#template').content;
const elementCard = userTemplate.querySelector('.card').cloneNode(true);
const card = userTemplate.querySelector('.card').cloneNode('true');
// функция для открытия popup'ов
function openPopup(popup) {
  popup.classList.add('popup_opened');
}

// функция для закрытия popup'ов
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

// функция работы с формой введения данных в профиль
function EditProfile() {
  evt.preventDefault();
  profileTitle.textContent = inputName.value;
  profileSubtitle.textContent = inputProfession.value;
  closePopup(popupEditProfile);
}

// воссоздание массива initialCards
initialCards.forEach(object => {
  const elementCard = userTemplate.querySelector('.card').cloneNode(true);
  createCard(elementCard);
  elementCard.querySelector('.card__image').alt = '$(name).';
  elementCard.querySelector('.card__image').src = object.link;
  elementCard.querySelector('.card__title').textContent = object.name;
  cardContainer.append(elementCard);
});

// функция открытия PopupEditProfile
function openPopupEditProfile() {
  openPopup(popupEditProfile);
  inputName.value = profileTitle.textContent;
  inputProfession.value = profileSubtitle.textContent;
  buttonCloseProfile.addEventListener('click', () => {
    closePopup(popupEditProfile);
  });
  EditProfile(evt);
  buttonSaveProfile.addEventListener('submit', popupEditProfile);
}

// функция открытие popupAddCard
function openPopupAddCard() {
  openPopup(popupAddCard);


  const card = userTemplate.querySelector('.card').cloneNode('true');
  const inputName = popupAddCard.querySelector('.popup__inputs_data_name');
  const inputProfession = popupAddCard.querySelector('.popup__inputs_data_profession');
  buttonCloseCard.addEventListener('click', () => {
    closePopup(popupAddCard);
  });
  buttonSaveCard.addEventListener('submit', (evt) => {
    evt.preventDefault();
    createCard(card);
    card.querySelector('.card__image').src = inputProfession.value;
    card.querySelector('.card__title').textContent = inputName.value;
    card.querySelector('.card__image').alt = 'изображение' + inputName.value;
    inputName.value = '';
    inputProfession.value = '';
    cardContainer.prepend(card);
    closePopup(popupAddCard);
  });
}

card.querySelector('.card__image').addEventListener('click', showImagePopup);
const imagePopupFigure = popupImage.querySelector('.popup_picture__image');
const imagePopupCaption = popupImage.querySelector('.popup-picture__title');

function showImagePopup (event) {
  imagePopupFigure.src = event.target.src;
  imagePopupFigure.alt = event.target.alt;
  imagePopupCaption.textContent = event.target.closest('.card').querySelector('.card__title').textContent;

  openPopup(popupImage);
}

// функция createCard и функция поставить лайк внутри
function createCard(card) {
  const buttonLike = card.querySelector('.card__like-button');
  function createLike() {
    buttonLike.classList.toggle('card__like-button_active');
  }
  buttonLike.addEventListener('click', createLike);

  const cardImage = card.querySelector('.card__image');
 /* cardImage.addEventListener('click', openPopupImage);
  function openPopupImage() {
    popupImage.classList.toggle('popup_opened');
  popupImage.querySelector('.popup-picture__image').src = card.querySelector('.card__image').src;
    popupImage.querySelector('.popup-picture__title').textContent = card.querySelector('.card__title').textContent;



    buttonClosePicture.addEventListener('click', () => {
      popupImage.classList.remove('popup_opened');
    });
  }

  const buttonDelete = card.querySelector('.card__delete-button');
  function removeCard() {
    card.remove();
  }
  buttonDelete.addEventListener('click', removeCard);

  return card;
}

// слушатели и обработчики
buttonEdit.addEventListener('click', openPopupEditProfile);
buttonAdd.addEventListener('click', openPopupAddCard);
buttonCloseProfile.addEventListener('click', closePopup(popupEditProfile));
buttonCloseCard.addEventListener('click', closePopup(popupAddCard));
buttonClosePicture.addEventListener('click', closePopup(popupImage));
popupEditProfileContainer.addEventListener('submit', EditProfile);

/* buttonClosePicture.addEventListener('click', closePopup(popupImage));;*/

/*
function openPopupImage2 (evt) {
  openPopup(popupImage);
  cardImage.src = evt.target.src;
  cardImage.alt = evt.target.alt.textContent;
  cardSubtitle.textContent = evt.target.alt;
}*/
