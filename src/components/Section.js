export default class Section {
  /**
   * Класс отвечает за отрисовку элементов на странице
   *
   * Параметры:
   * items - массив данных, которые нужно добавить на страницу при инициализации класса,
   * renderer - функция, которая отвечает за создание и отрисовку данных на странице,
   * containerSelector - селектор контейнера, в который нужно добавлять созданные элементы
   */
  constructor(renderer, containerSelector) {
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems(cards, userId) {
    cards.forEach((item) => {
      this._renderer(item, userId);
    });
  }

  addItem(item) {
    this._container.prepend(item);
  }
}
