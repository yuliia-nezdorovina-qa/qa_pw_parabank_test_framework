import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class SignInPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.logInButton = page.getByRole('button', { name: 'Log In' });
    this.emptyErrorMessage = page.getByText('Please enter a username and');
    this.notVerifiedErrorMessage = page.getByText('The username and password');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async fillUsernameField(username) {
    await this.step(`Fill "Username" field`, async () => {
      await this.usernameField.fill(username);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill "Password" field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async clickLogInButton() {
    await this.step(`Click "Log in" button`, async () => {
      await this.logInButton.click();
    });
  }

  async assertEmptyErrorMessageContainsText(messageText) {
    await this.step(
      `Assert the '${messageText}' error message is shown`,
      async () => {
        await expect(this.emptyErrorMessage).toContainText(messageText);
      },
    );
  }
  async assertNotVerifiedErrorMessageContainsText(messageText) {
    await this.step(
      `Assert the '${messageText}' error message is shown`,
      async () => {
        await expect(this.notVerifiedErrorMessage).toContainText(messageText);
      },
    );
  }

  async submitLogInForm(user) {
    await this.step(`Fill the 'Log in' form`, async () => {
      await this.fillUsernameField(user.username);
      await this.fillPasswordField(user.password);
      await this.clickLogInButton();
    });
  }

  async assertLoginFormIsVisible() {
    await this.step(
      'Assert login form (username and password fields) is visible',
      async () => {
        await expect(this.usernameField).toBeVisible();
        await expect(this.passwordField).toBeVisible();
      },
    );
  }
}
