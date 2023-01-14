/** Элементы страницы */
const profileEditButton = document.querySelector('.profile__button-edit');
const profileName = document.querySelector('.profile__title');
const profileJob = document.querySelector('.profile__subtitle');

const newCardButton = document.querySelector('.profile__button-add');
const cardsContainer = document.querySelector('.elements');
const cardTemplate = document.getElementById('cards').content;

const profileEditPopup = document.getElementById('popup_profile-edit');
const profileEditForm = profileEditPopup.querySelector('.popup__form');
const profileNameInput = profileEditPopup.querySelector('.popup__input_data_name');
const profileJobInput = profileEditPopup.querySelector('.popup__input_data_profession');

const newCardPopup = document.getElementById('popup_card-add');
const newCardForm = newCardPopup.querySelector('.popup__form');
const newCardSaveButton = newCardPopup.querySelector('.popup__save-button');
const newCardTitle = newCardPopup.querySelector('.popup__input_place_name');
const newCardLink = newCardPopup.querySelector('.popup__input_place_link');

const imagePopup = document.getElementById('popup__picture');
const imagePopupFigure = imagePopup.querySelector('.popup__picture-image');
const imagePopupCaption = imagePopup.querySelector('.popup__picture-title');

//  кнопки закрытия popup'ов
const profileCloseButton = profileEditPopup.querySelector('.popup__button-close');
const newCardCloseButton = newCardPopup.querySelector('.popup__button-close');
const imageCloseButton = imagePopup.querySelector('.popup__button-close');

const buttonCloseList = document.querySelectorAll('.popup__button-close');
const popups = document.querySelectorAll('.popup');

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
function renderCards(container, ...cards) {
  cards.forEach(card => {
    container.prepend(getNewCard(card.name, card.link));
  });
}

/** Функция создает из шаблона элемент с новой карточкой и возвращает его */
function getNewCard(name, link) {
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
function likeCard(event) {
  event.target.closest('.card__like-button').classList.toggle('card__like-button_active');
}

/** Функция удаления карточки при нажатии на кнопку */
function deleteCard(event) {
  event.target.closest('.card').remove();
}

/** Функция открывает нужный попап */
function openPopup(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keydown', closePopupByKey);
}

/** Функция закрывает текущий попап */
function closePopup(popup) {
  popup.classList.remove('popup_opened');
}

/** Обработчик для закрытия попапов по кнопке Esc */
function closePopupByKey(evt) {
  if (evt.key === 'Escape') {
    const popup = document.querySelector('.popup_opened');
    closePopup(popup);
  }
}

/** Функция сохраняет введенные данные и закрывает попап */
function saveProfileInfo(event) {
  event.preventDefault();
  profileName.textContent = profileNameInput.value;
  profileJob.textContent = profileJobInput.value;
  closePopup(profileEditPopup);
}

/** Функция сохраняет введенные данные и закрывает попап */
function saveNewCard(event) {
  event.preventDefault();
  const card = {
    name: newCardTitle.value,
    link: newCardLink.value
  };
  renderCards(cardsContainer, card);
  closePopup(newCardPopup);
  newCardForm.reset();
}

/** Функция открывает попап с увеличенной картинкой */
function showImagePopup(event) {
  imagePopupFigure.src = event.target.src;
  imagePopupFigure.alt = event.target.alt;
  imagePopupCaption.textContent = event.target.closest('.card').querySelector('.card__title').textContent;
  openPopup(imagePopup);
}

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

buttonCloseList.forEach(btn => {
  const popup = btn.closest('.popup');
  btn.addEventListener('click', () => closePopup(popup));
})

popups.forEach(popup => {
  popup.addEventListener('mousedown', evt => {
    if (evt.target === evt.currentTarget) closePopup(evt.target);
  });
});

/** Отобразить исходные карточки при загрузке страницы */
renderCards(cardsContainer, ...initialCards);
