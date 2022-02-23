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
        <button id="signout">Signout</button>
      </div>
    `;
  }

  setOnSignout(handler) {
    this.onSignout = handler;
  }

  signoutHandler = () => {
    this.onSignout();
  };

  attachSignoutHandler() {
    this.element
      .querySelector('#signout')
      .addEventListener('click', this.signoutHandler);
  }
}
