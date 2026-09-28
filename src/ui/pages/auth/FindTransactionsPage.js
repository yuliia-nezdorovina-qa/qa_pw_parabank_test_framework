import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class FindTransactionsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.selectAccount = page.locator('#accountId');
    this.findByTransactionIDField = page.locator('#transactionId');
    this.findByTransactionIDButton = page.locator('#findById');
    this.findByDateField = page.locator('#transactionDate');
    this.findByDateButton = page.locator('#findByDate');
    this.fromDateField = page.locator('#fromDate');
    this.toDateField = page.locator('#toDate');
    this.findByDateRangeButton = page.locator('#findByDateRange');
    this.findByAmountField = page.locator('#amount');
    this.findByAmountButton = page.locator('#findByAmount');
    this.transactionResultsHeading = page.getByRole('heading', {
      name: 'Transaction Results',
    });
    this.transactionResultRows = page.locator('#transactionBody tr');
    this.transactionLink = transactionText =>
      page.getByRole('link', { name: transactionText });
    this.invalidTransactionIDMessage = page.getByText('Invalid transaction ID');
    this.invalidDateFormatMessage = page.locator('#transactionDateError');
    this.invalidDateRangeMessage = page.locator('#dateRangeError');
    this.invalidAmountMessage = page.getByText('Invalid amount');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Find Transactions' page`, async () => {
      await this.page.goto('findtrans.htm');
    });
  }

  errorMessage(errorMessage) {
    return this.page.getByText(errorMessage);
  }

  async selectAccountById(accountId) {
    await this.step(`Select account = ${accountId}`, async () => {
      await this.selectAccount.selectOption(accountId);
    });
  }

  async fillFindByTransactionIDField(transactionID) {
    await this.step('Fill "Find by transaction ID" field', async () => {
      await this.findByTransactionIDField.fill(transactionID);
    });
  }

  async clickFindByTransactionIDButton() {
    await this.step('Click "Find by transaction ID" button', async () => {
      await this.findByTransactionIDButton.click();
    });
  }

  async fillFindByDateField(date) {
    await this.step('Fill "Find by Date" field', async () => {
      await this.findByDateField.fill(date);
    });
  }

  async clickFindByDateButton() {
    await this.step('Click "Find by Date" button', async () => {
      await this.findByDateButton.click();
    });
  }

  async fillFromDateField(date) {
    await this.step('Fill "From Date" field', async () => {
      await this.fromDateField.fill(date);
    });
  }

  async fillToDateField(date) {
    await this.step('Fill "To Date" field', async () => {
      await this.toDateField.fill(date);
    });
  }

  async clickFindByDateRangeButton() {
    await this.step('Click "Find by Date Range" button', async () => {
      await this.findByDateRangeButton.click();
    });
  }

  async fillFindByAmountField(amount) {
    await this.step('Fill "Find by Amount" field', async () => {
      await this.findByAmountField.fill(amount);
    });
  }

  async clickFindByAmountButton() {
    await this.step('Click "Find by Amount" button', async () => {
      await this.findByAmountButton.click();
    });
  }

  async assertTransactionResultsHeadingIsVisible() {
    await this.step(
      'Assert "Transaction Results" heading is shown',
      async () => {
        await expect(this.transactionResultsHeading).toBeVisible();
      },
    );
  }

  async assertTransactionIsVisible(transactionText) {
    await this.step(
      `Assert transaction "${transactionText}" is visible in results`,
      async () => {
        await expect(this.transactionLink(transactionText)).toBeVisible();
      },
    );
  }

  async getTransactionResultsCount() {
    return await this.step('Get transaction results count', async () => {
      return await this.transactionResultRows.count();
    });
  }

  async getTransactionIdFromRow(rowIndex = 0) {
    return await this.step('Get transaction ID from results row', async () => {
      const href = await this.transactionResultRows
        .nth(rowIndex)
        .locator('a')
        .getAttribute('href');
      const match = href.match(/id=(\d+)/);
      return match ? match[1] : null;
    });
  }

  async assertInvalidTransactionIDMessageIsVisible() {
    await this.step(
      'Assert "Invalid transaction ID" message is shown',
      async () => {
        await expect(this.invalidTransactionIDMessage).toBeVisible();
      },
    );
  }

  async assertInvalidDateFormatMessageIsVisible() {
    await this.step(
      'Assert "Invalid date format" message is shown (Find by Date)',
      async () => {
        await expect(this.invalidDateFormatMessage).toBeVisible();
      },
    );
  }

  async assertInvalidDateRangeMessageIsVisible() {
    await this.step(
      'Assert "Invalid date format" message is shown (Find by Date Range)',
      async () => {
        await expect(this.invalidDateRangeMessage).toBeVisible();
      },
    );
  }

  async assertInvalidAmountMessageIsVisible() {
    await this.step('Assert "Invalid amount" message is shown', async () => {
      await expect(this.invalidAmountMessage).toBeVisible();
    });
  }
}
