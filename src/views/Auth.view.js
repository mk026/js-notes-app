import AbstractView from './Abstract.view';

export default class AuthView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  getTemplate() {
    return `
      <div class="auth">
        <h2>Auth</h2>
      </div>
    `;
  }
}
