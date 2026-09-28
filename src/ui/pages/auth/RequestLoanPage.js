import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class RequestLoanPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.loanAmountField = page.locator('#amount');
    this.downPaymentField = page.locator('#downPayment');
    this.fromAccountSelect = page.locator('#fromAccountId');
    this.applyNowButton = page.getByRole('button', { name: 'Apply Now' });
    this.errorHeading = page.getByRole('heading', { name: 'Error!' });
    this.loanRequestProcessed = page.getByRole('heading', {
      name: 'Loan Request Processed',
    });
    this.statusApproved = page.getByRole('cell', { name: 'Approved' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Request Loan' page`, async () => {
      await this.page.goto('requestloan.htm');
    });
  }

  async assertErrorHeadingIsVisible() {
    await this.step('Assert "Error" heading is shown', async () => {
      await expect(this.errorHeading).toBeVisible();
    });
  }
  async assertLoanRequestProcessedHeadingIsVisible() {
    await this.step(
      'Assert "Loan Request Processed" heading is shown',
      async () => {
        await expect(this.loanRequestProcessed).toBeVisible();
      },
    );
  }
  async assertStatusApprovedIsVisible() {
    await this.step('Assert "Status:	Approved" is shown', async () => {
      await expect(this.statusApproved).toBeVisible();
    });
  }

  async clickApplyNowButton() {
    await this.step('Click "Apply Now" button', async () => {
      await this.applyNowButton.click();
    });
  }

  async fillLoanAmountField(amount) {
    await this.step(`Fill "Loan Amount" field`, async () => {
      await this.loanAmountField.fill(amount);
    });
  }

  async fillDownPaymentField(amount) {
    await this.step(`Fill "Down Payment" field`, async () => {
      await this.downPaymentField.fill(amount);
    });
  }

  async selectFromAccount(accountId) {
    await this.step(`Select "From account" = ${accountId}`, async () => {
      await this.fromAccountSelect.selectOption(accountId);
    });
  }
}
