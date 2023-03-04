export default class Popup {
  /**
   * Класс отвечает за открытие и закрытие попапа
   *
   * Параметры:
   * popupSelector - селектор попапа
   *
   */
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
    this._handleEscClose = this._handleEscClose.bind(this);
    this._handleMouseClose = this._handleMouseClose.bind(this);
    this._popupCloseButton = this._popup.querySelector(".popup__button-close");
    this.close = this.close.bind(this);
  }

  open() {
    this._popup.classList.add("popup_opened");
    this.setEventListeners();
    document.addEventListener("keydown", this._handleEscClose);
  }

  close() {
    this._popup.classList.remove("popup_opened");
    this.removeEventListeners();
    document.removeEventListener("keydown", this._handleEscClose);
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  _handleMouseClose(event) {
    if (event.target.classList.contains("popup_opened")) {
      this.close();
    }
  }

  setEventListeners() {
    this._popup.addEventListener("mousedown", this._handleMouseClose);
    this._popupCloseButton.addEventListener("click", this.close);
  }

  removeEventListeners() {
    this._popup.removeEventListener("mouseup", this._handleMouseClose);
    this._popupCloseButton.removeEventListener("click", this.close);
  }
}
