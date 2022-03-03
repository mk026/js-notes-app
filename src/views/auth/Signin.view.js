import AbstractView from '../Abstract.view';

export default class SigninView extends AbstractView {
  constructor() {
    super();
    this.element = this.getElement();
  }

  getTemplate() {
    return `
      <form class="signin-form">
        <label for="email">Email</label>
        <input id="email" type="email"/>
        <label for="password">Password</label>
        <input id="password" type="password"/>
        <button type="submit">Sign in</button>
      </form>
    `;
  }

  setOnSignin(handler) {
    this.onSignin = handler;
  }

  mount(container) {
    container.appendChild(this.element, 'afterbegin');

    this.attachSigninHandler();
  }

  unmount() {
    this.removeSigninHandler();

    this.element.remove();
  }

  signinHandler = (event) => {
    event.preventDefault();

    const email = this.element.querySelector('#email').value;
    const password = this.element.querySelector('#password').value;

    this.onSignin(email, password);
  };

  attachSigninHandler() {
    this.element.addEventListener('submit', this.signinHandler);
  }

  removeSigninHandler() {
    this.element.removeEventListener('submit', this.signinHandler);
  }
}
