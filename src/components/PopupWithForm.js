import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  /**
   * Класс отвечает за работу с попапом, содержащим форму
   *
   * Параметры:
   * popupSelector - селектор элемента с попапом
   * handleSubmit - обработчик отправки формы
   */
  constructor(popupSelector, handleSubmit) {
    super(popupSelector);
    this._handleSubmit = handleSubmit;
    this._form = this._popup.querySelector(".popup__form");
    this._inputs = [...this._form.querySelectorAll(".popup__input")];
    this._submitForm = this._submitForm.bind(this);
    this._submitButton = this._form.querySelector(".popup__save-button");
  }

  _getInputValues() {
    const values = {};
    this._inputs.forEach((input) => {
      values[input.name] = input.value;
    });
    return values;
  }

  _submitForm(event) {
    event.preventDefault();
    this._handleSubmit(this._getInputValues(), this._submitButton);
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", this._submitForm);
  }

  removeEventListeners() {
    super.removeEventListeners();
    this._form.removeEventListener("submit", this._submitForm);
  }

  close() {
    super.close();
    this._form.reset();
  }
}
