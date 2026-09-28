import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class AccountDetailsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.accountNumber = page.locator('#accountId');
    this.accountType = page.locator('#accountType');
    this.balance = page.locator('#balance');
    this.availableBalance = page.locator('#availableBalance');
    this.activityPeriod = page.locator('#month');
    this.transactionType = page.locator('#transactionType');
    this.noTransactionsFoundMessage = page.getByText('No transactions found.');
    this.goButton = page.getByRole('button', { name: 'GO' });
    this.transactionsTable = page.locator('#transactionTable');
    this.transactionRows = page.locator('#transactionTable tbody tr');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async verifyAccountNumber(accountId) {
    await expect(this.accountNumber).toHaveText(accountId);
  }
  async verifyAccountType(accountId) {
    await expect(this.accountType).toHaveText(accountId);
  }

  async getBalance() {
    return await this.step('Get "Balance" value', async () => {
      await expect(this.balance).toHaveText(/\$\d/);
      const text = await this.balance.innerText();
      return parseFloat(text.replace(/[^0-9.-]/g, ''));
    });
  }

  async getAvailableBalance() {
    return await this.step('Get "Available Balance" value', async () => {
      await expect(this.availableBalance).toHaveText(/\$\d/);
      const text = await this.availableBalance.innerText();
      return parseFloat(text.replace(/[^0-9.-]/g, ''));
    });
  }

  async assertNoTransactionsFoundMessageContainsText(message) {
    await this.step(`Assert "No transactions found." is shown`, async () => {
      await expect(this.noTransactionsFoundMessage).toContainText(message);
    });
  }

  async selectActivityPeriod(period) {
    await this.step(`Select "Activity Period" = ${period}`, async () => {
      await this.activityPeriod.selectOption(period);
    });
  }

  async selectTransactionType(type) {
    await this.step(`Select "Type" = ${type}`, async () => {
      await this.transactionType.selectOption(type);
    });
  }

  async clickGoButton() {
    await this.step(`Click "GO" button`, async () => {
      await this.goButton.click();
    });
  }

  async getTransactionRowsCount() {
    return await this.step('Get transaction rows count', async () => {
      return await this.transactionRows.count();
    });
  }

  async assertAllTransactionDatesAreToday() {
    await this.step('Assert all transaction dates are today', async () => {
      const today = new Date();
      const mm = String(today.getMonth() + 1).padStart(2, '0');
      const dd = String(today.getDate()).padStart(2, '0');
      const yyyy = today.getFullYear();
      const todayFormatted = `${mm}-${dd}-${yyyy}`;

      const rowsCount = await this.transactionRows.count();
      for (let i = 0; i < rowsCount; i++) {
        const dateText = await this.transactionRows
          .nth(i)
          .locator('td')
          .first()
          .innerText();
        expect(dateText.trim()).toBe(todayFormatted);
      }
    });
  }

  getCurrentMonthName() {
    const monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    return monthNames[new Date().getMonth()];
  }
}
