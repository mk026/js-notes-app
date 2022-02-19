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

  getSigninForm() {
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

  getSignupForm() {
    return `
      <form class="signup-form">
        <label for="name">Name</label>
        <input id="name" type="text"/>
        <label for="email">Email</label>
        <input id="email" type="email"/>
        <label for="password">Password</label>
        <input id="password" type="password"/>
        <label for="confirm-password">Confirm password</label>
        <input id="confirm-password" type="password"/>
        <button type="submit">Sign up</button>
      </form>
    `;
  }

  setOnSignup(handler) {
    this.onSignup = handler;
  }

  setOnSignin(handler) {
    this.onSignin = handler;
  }
}
