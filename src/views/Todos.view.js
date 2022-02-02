import AbstractView from './Abstract.view';

export default class TodosView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  getTemplate() {
    return `
      <div class="todos">
        <h2>Todos</h2>
        <ul class="todos__list">
        </ul>
      </div>
    `;
  }
}
