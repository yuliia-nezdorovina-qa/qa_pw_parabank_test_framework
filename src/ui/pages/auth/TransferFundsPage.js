import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class TransferFundsPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.amountField = page.locator('#amount');
    this.fromAccountField = page.locator('#fromAccountId');
    this.toAccountField = page.locator('#toAccountId');
    this.transferButton = page.getByRole('button', { name: 'Transfer' });

    this.transferCompleteHeading = page.getByRole('heading', {
      name: 'Transfer Complete!',
    });
    this.transferErrorMessage = page.getByText('An internal error has');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Transfer Funds' page`, async () => {
      await this.page.goto('transfer.htm');
    });
  }

  async fillAmountField(amount) {
    await this.step(`Fill "Amount" field`, async () => {
      await this.amountField.fill(amount);
    });
  }

  async selectFromAccount(accountId) {
    await this.step(`Select "From account" = ${accountId}`, async () => {
      await this.fromAccountField.selectOption(accountId);
    });
  }

  async selectToAccount(accountId) {
    await this.step(`Select "To account" = ${accountId}`, async () => {
      await this.toAccountField.selectOption(accountId);
    });
  }

  async clickTransferButton() {
    await this.step(`Click "Transfer" button`, async () => {
      await this.transferButton.click();
    });
  }

  async assertTransferCompleteHeadingIsVisible() {
    await this.step(
      `Assert "Transfer Complete!" heading is shown`,
      async () => {
        await expect(this.transferCompleteHeading).toBeVisible();
      },
    );
  }
  async assertTransferErrorMessageIsShown() {
    await this.step(`Assert transfer error is shown`, async () => {
      await expect(this.transferErrorMessage).toBeVisible();
    });
  }

  async assertTransferDetails(amount, fromAccountId, toAccountId) {
    const formattedAmount = Number(amount).toFixed(2);
    const expectedText = `$${formattedAmount} has been transferred from account #${fromAccountId} to account #${toAccountId}.`;
    await this.step(
      `Assert transfer details: amount, from account and to account`,
      async () => {
        await expect(this.page.getByText(expectedText)).toBeVisible();
      },
    );
  }
}
