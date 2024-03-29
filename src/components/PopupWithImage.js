import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  /**
   * Класс отвечает за работу с попапом, содержащим увеличенное изображение
   *
   * Параметры:
   * popupSelector - селектор элемента с попапом
   */
  constructor(popupSelector) {
    super(popupSelector);
    this._figureElement = this._popup.querySelector(".popup__picture-image");
    this._captionElement = this._popup.querySelector(".popup__picture-title");
  }

  open(text, imageLink) {
    this._figureElement.src = imageLink;
    this._figureElement.alt = text;
    this._captionElement.textContent = text;
    super.open();
  }
}
