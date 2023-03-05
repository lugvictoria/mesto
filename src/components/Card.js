export default class Card {
  /**
   * Класс отвечает за создание карточки
   *
   * Параметры:
   * name - отображаемый заголовок карточки
   * link - ссылка на изображение
   * templateSelector - селектор template-элемента с шаблоном карточки
   * handleCardClick - обработчик нажатия на изображение карточки
   */
  constructor(
    { name, link, likes, _id, owner },
    templateSelectors,
    handleCardClick,
    openPopupDelete,
    clickLikeClick,
    userId
  ) {
    this._name = name;
    this._link = link;
    this._likesArr = likes;
    this._likes = likes.length;
    this._id = _id;
    this._ownerId = owner._id;
    this._templateSelectors = templateSelectors;
    this._handleCardClick = handleCardClick;
    this._openPopupDelete = openPopupDelete;
    this._userId = userId;
    this._clickLike = clickLikeClick;
  }

  _getTemplate(template) {
    const cardTemplate = document
      .querySelector(template)
      .content.querySelector(".card")
      .cloneNode(true);
    return cardTemplate;
  }

  _likeCard() {
    this._clickLike(this, this._id, this._isLiked);
    this._isLiked = !this._isLiked;
  }

  updateLikesCount(count) {
    this._elementLikeCounter.textContent = count;
  }

  changeLikeColor() {
    this._elementLike.classList.toggle("card__like-button_active");
  }

  generateCard() {
    this._isLiked = this._likesArr.some((like) => {
      return like._id === this._userId;
    });
    this._isOwner = this._ownerId === this._userId;

    if (this._isOwner) {
      this._templateSelector = this._templateSelectors.withBasket;
    } else {
      this._templateSelector = this._templateSelectors.withoutBasket;
    }

    this._element = this._getTemplate(this._templateSelector);

    // Заполнение содержимого
    this._image = this._element.querySelector(".card__image");
    this._image.src = this._link;
    this._image.alt = this._name;
    this._element.querySelector(".card__title").textContent = this._name;

    this._elementLike = this._element.querySelector(".card__like-button");

    if (this._isOwner) {
      this._elementTrash = this._element.querySelector(".card__delete-button");
    }

    if (this._isLiked) {
      this._elementLike.classList.add("card__like-button_active");
    }

    this._elementLikeCounter = this._element.querySelector(".card__like-count");
    this._elementLikeCounter.textContent = this._likes;

    // Обработчики нажатий
    this._setEventlisteners();

    return this._element;
  }

  _setEventlisteners() {
    this._elementLike.addEventListener("click", () => this._likeCard());

    if (this._isOwner) {
      this._elementTrash.addEventListener("click", () => this._deleteCard());
    }

    this._image.addEventListener("click", () => this._openPopup());
  }

  _openPopup() {
    this._handleCardClick(this._name, this._link);
  }

  _deleteCard() {
    this._openPopupDelete(this._element, this._id);
  }
}
