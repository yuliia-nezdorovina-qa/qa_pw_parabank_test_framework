import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class HomePage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.successMessage = page.getByText('Your account was created');
    this.usernameField = page.locator('input[name="username"]');
    this.passwordField = page.locator('input[name="password"]');
    this.logInButton = page.getByRole('button', { name: 'Log In' });
    this.accountsOverviewLink = page.getByRole('link', {
      name: 'Accounts Overview',
    });
    this.customerLoginHeading = page.getByRole('heading', {
      name: 'Customer Login',
    });
    this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });
    this.logOutLink = page.getByRole('link', { name: 'Log Out' });
  }

  async open() {
    await this.step(`Open 'Home' page`, async () => {
      await this.page.goto('');
    });
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
  async clickAccountsOverviewLink() {
    await this.step(`Click "Accounts Overview" link`, async () => {
      await this.accountsOverviewLink.click();
    });
  }

  async clickBillPayLink() {
    await this.step('Click "Bill Pay" link', async () => {
      await this.billPayLink.click();
    });
  }

  userName(userName) {
    return this.page.getByRole('heading', { name: `Welcome ${userName}` });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertSuccessMessageContainsText(messageText) {
    await this.step(
      `Assert the '${messageText}' success message is shown`,
      async () => {
        await expect(this.successMessage).toContainText(messageText);
      },
    );
  }
  async assertUserNameIsVisible(userName) {
    await this.step(`Assert the '${userName}' is shown`, async () => {
      await expect(this.userName(userName)).toBeVisible();
    });
  }
  async assertCustomerLoginHeadingIsVisible() {
    await this.step(`Assert the 'Customer Login' is shown`, async () => {
      await expect(this.customerLoginHeading).toBeVisible();
    });
  }

  async clickLogOutLink() {
    await this.step('Click "Log Out" link', async () => {
      await this.logOutLink.click();
    });
  }
}
