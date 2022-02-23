import AbstractView from './Abstract.view';

export default class AccountView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  getTemplate() {
    return `
      <div class="account">
        <h2>Account</h2>
      </div>
    `;
  }
}
