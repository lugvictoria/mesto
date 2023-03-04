import Popup from "./Popup.js";

export default class PopupDelete extends Popup {
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._form = this._popup.querySelector(".popup__form");
    this._handleSubmit = handleSubmit;
    this._submitForm = this._submitForm.bind(this);
    this._submitButton = this._form.querySelector(".popup__save-button");
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }
  _submitForm(event) {
    event.preventDefault();
    this._handleSubmit(this._card, this._cardId, this._submitButton);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitForm);
  }
}
