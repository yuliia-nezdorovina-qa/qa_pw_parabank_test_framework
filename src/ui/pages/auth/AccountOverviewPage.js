import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class AccountOverviewPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountOverviewHeading = page.getByRole('heading', {
      name: 'Accounts Overview',
    });
    this.accountsTable = page.locator('#accountTable');
    this.accountRows = page.locator('#accountTable tbody tr');
    this.accountTableHeader = page.getByRole('cell', { name: 'Account' });
    this.balanceTableHeader = page.getByRole('cell', { name: 'Balance*' });
    this.availableAmountTableHeader = page.getByRole('cell', {
      name: 'Available Amount',
    });
    this.openNewAccountLink = page.getByRole('link', {
      name: 'Open New Account',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async getFirstAccountId() {
    return await this.step('Get first account ID from overview', async () => {
      const text = await this.accountRows
        .first()
        .locator('td')
        .first()
        .innerText();
      return text.trim();
    });
  }

  accountLink(accountId) {
    return this.page.getByRole('link', { name: accountId });
  }

  accountRow(accountId) {
    return this.page
      .locator('#accountTable tbody tr')
      .filter({ has: this.accountLink(accountId) });
  }

  async getAccountBalance(accountId) {
    return await this.step(
      `Get balance for account "${accountId}"`,
      async () => {
        const balanceText = await this.accountRow(accountId)
          .locator('td')
          .nth(1)
          .innerText();
        return parseFloat(balanceText.replace(/[^0-9.-]/g, ''));
      },
    );
  }

  async getAvailableAmount(accountId) {
    return await this.step(
      `Get available amount for account "${accountId}"`,
      async () => {
        const balanceText = await this.accountRow(accountId)
          .locator('td')
          .nth(2)
          .innerText();
        return parseFloat(balanceText.replace(/[^0-9.-]/g, ''));
      },
    );
  }

  async assertAccountIsVisible(accountId) {
    await this.step(
      `Assert account "${accountId}" is visible in overview`,
      async () => {
        await expect(this.accountLink(accountId)).toBeVisible();
      },
    );
  }

  async clickOpenNewAccountLink() {
    await this.step(`Click "Open New Account" link`, async () => {
      await this.openNewAccountLink.click();
    });
  }
  async clickAccountId(accountId) {
    await this.step(`Click "Account number" link`, async () => {
      await this.accountLink(accountId).click();
    });
  }

  async assertAccountOverviewIsVisible() {
    await this.step(
      'Assert "Accounts Overview" heading is visible',
      async () => {
        await expect(this.accountOverviewHeading).toBeVisible();
      },
    );
  }

  async assertAtLeastOneAccountIsVisible() {
    await this.step('Assert at least one account is visible', async () => {
      await expect(this.accountRows.first()).toBeVisible();
    });
  }

  async assertAccountsTableHeadersAreVisible() {
    await this.step('Assert accounts table headers are visible', async () => {
      await expect(this.accountTableHeader).toBeVisible();
      await expect(this.balanceTableHeader).toBeVisible();
      await expect(this.availableAmountTableHeader).toBeVisible();
    });
  }
}
