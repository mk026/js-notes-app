import AbstractView from './Abstract.view';

export default class HomeView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  getTemplate() {
    return `
      <div class="home">
        <h2>Home</h2>
      </div>
    `;
  }
}
