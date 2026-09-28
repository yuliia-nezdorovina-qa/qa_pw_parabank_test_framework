import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class OpenNewAccountPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.openNewAccountHeader = page.getByRole('heading', {
      name: 'Open New Account',
    });
    this.openNewAccountButton = page.getByRole('button', {
      name: 'Open New Account',
    });
    this.accountOpenedHeading = page.getByRole('heading', {
      name: 'Account Opened!',
    });
    this.congratulationsMessage = page.getByText(
      'Congratulations, your account',
    );
    this.fromAccountIdField = page.locator('#fromAccountId');
    this.accountTypeField = page.locator('#type');
    this.newAccountIdLink = page.locator('#newAccountId');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async assertOpenNewAccountHeaderIsVisible() {
    await this.step(
      `Assert the 'Open New Account' Header is shown`,
      async () => {
        await expect(this.openNewAccountHeader).toBeVisible();
      },
    );
  }
  async assertAccountOpenedHeadingIsVisible() {
    await this.step(`Assert the 'Account Opened' header is shown`, async () => {
      await expect(this.accountOpenedHeading).toBeVisible();
    });
  }

  async clickOpenNewAccountButton() {
    await this.step(`Click "Open New Account" button`, async () => {
      await this.openNewAccountButton.click();
    });
  }

  async assertCongratulationsMessageContainsText(messageText) {
    await this.step(
      `Assert the '${messageText}' message is shown`,
      async () => {
        await expect(this.congratulationsMessage).toContainText(messageText);
      },
    );
  }

  async assertFromAccountIdIsNotEmpty() {
    await this.step('Assert "From Account" dropdown has a value', async () => {
      const value = this.fromAccountIdField;
      await expect(value).not.toHaveValue('');
    });
  }

  async assertAccountTypeIsNotEmpty() {
    await this.step(`Assert "Account Type" drvalue`, async () => {
      const value = this.accountTypeField;
      await expect(value).not.toHaveValue('');
    });
  }
  async selectAccountType(accountType) {
    await this.step(`Select "${accountType}" account type`, async () => {
      await this.accountTypeField.selectOption(accountType);
    });
  }

  async selectFromAccount(accountId) {
    await this.step(
      `Select "From Account" with id "${accountId}"`,
      async () => {
        await this.fromAccountIdField.selectOption(accountId);
      },
    );
  }

  async selectFirstFromAccount() {
    await this.step('Select first available "From Account"', async () => {
      await this.fromAccountIdField.selectOption({ index: 0 });
    });
  }

  async getNewAccountId() {
    await expect(this.newAccountIdLink).toHaveText(/\d+/);
    const accountId = await this.newAccountIdLink.textContent();
    return accountId?.trim();
  }
}
