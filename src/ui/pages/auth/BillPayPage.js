import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class BillPayPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.payeeNameField = page.locator('input[name="payee\\.name"]');
    this.addressField = page.locator('input[name="payee\\.address\\.street"]');
    this.cityField = page.locator('input[name="payee\\.address\\.city"]');
    this.stateField = page.locator('input[name="payee\\.address\\.state"]');
    this.zipCodeField = page.locator('input[name="payee\\.address\\.zipCode"]');
    this.phoneNumberField = page.locator('input[name="payee\\.phoneNumber"]');
    this.accountNumberField = page.locator(
      'input[name="payee\\.accountNumber"]',
    );
    this.verifyAccountNumberField = page.locator('input[name="verifyAccount"]');
    this.amountField = page.locator('input[name="amount"]');
    this.fromAccountField = page.getByRole('combobox');
    this.sendPaymentButton = page.getByRole('button', { name: 'Send Payment' });
    this.accountNumberRequired = page.locator('#validationModel-account-empty');
    this.accountNumberInvalid = page.locator(
      '#validationModel-account-invalid',
    );
    this.verifyAccountNumberRequired = page.locator(
      '#validationModel-verifyAccount-empty',
    );
    this.verifyAccountNumberInvalid = page.locator(
      '#validationModel-verifyAccount-invalid',
    );
    this.amountNumberInvalid = page.getByText('Please enter a valid amount.');
    this.billPaymentCompleteHeading = page.getByRole('heading', {
      name: 'Bill Payment Complete',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  async open() {
    await this.step(`Open 'Bill Pay' page`, async () => {
      await this.page.goto('billpay.htm');
    });
  }

  errorMessage(errorMessage) {
    return this.page.getByText(errorMessage);
  }

  async clickBillPayLink() {
    await this.step('Click "Bill Pay" link', async () => {
      await this.billPayLink.click();
    });
  }
  async clickSendPaymentButton() {
    await this.step(`Click "Send Payment" button`, async () => {
      await this.sendPaymentButton.click();
    });
  }

  async fillPayeeNameField(payeeName) {
    await this.step(`Fill "Payee Name" field`, async () => {
      await this.payeeNameField.fill(payeeName);
    });
  }

  async fillAddressField(address) {
    await this.step(`Fill "Address" field`, async () => {
      await this.addressField.fill(address);
    });
  }

  async fillCityField(city) {
    await this.step(`Fill "City" field`, async () => {
      await this.cityField.fill(city);
    });
  }

  async fillStateField(state) {
    await this.step(`Fill "State" field`, async () => {
      await this.stateField.fill(state);
    });
  }

  async fillZipCodeField(zipCode) {
    await this.step(`Fill "Zip Code" field`, async () => {
      await this.zipCodeField.fill(zipCode);
    });
  }

  async fillPhoneNumberField(phoneNumber) {
    await this.step(`Fill "Phone #" field`, async () => {
      await this.phoneNumberField.fill(phoneNumber);
    });
  }

  async fillAccountNumberField(accountNumber) {
    await this.step(`Fill "Account #" field`, async () => {
      await this.accountNumberField.fill(accountNumber);
    });
  }

  async fillVerifyAccountNumberField(verifyAccountNumber) {
    await this.step(`Fill "Verify Account #" field`, async () => {
      await this.verifyAccountNumberField.fill(verifyAccountNumber);
    });
  }

  async fillAmountField(amount) {
    await this.step(`Fill "Amount" field`, async () => {
      await this.amountField.fill(amount);
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage(messageText)).toBeVisible();
    });
  }

  async assertAccountNumberRequired() {
    await this.step(
      `Assert "Account number is required." error is shown`,
      async () => {
        await expect(this.accountNumberRequired).toBeVisible();
      },
    );
  }

  async assertVerifyAccountNumberRequired() {
    await this.step(
      `Assert "Please enter a valid number." error is shown`,
      async () => {
        await expect(this.verifyAccountNumberRequired).toBeVisible();
      },
    );
  }

  async assertAccountNumberInvalid() {
    await this.step(
      `Assert "Please enter a valid number." error is shown`,
      async () => {
        await expect(this.accountNumberInvalid).toBeVisible();
      },
    );
  }

  async assertVerifyAccountNumberInvalid() {
    await this.step(
      `Assert "Please enter a valid number." error is shown`,
      async () => {
        await expect(this.verifyAccountNumberInvalid).toBeVisible();
      },
    );
  }
  async assertAmountNumberInvalid() {
    await this.step(
      `Assert "Please enter a valid number." error is shown`,
      async () => {
        await expect(this.amountNumberInvalid).toBeVisible();
      },
    );
  }
  async assertBillPaymentCompleteHeadingIsVisible() {
    await this.step(`Assert "Bill Payment Complete" is shown`, async () => {
      await expect(this.billPaymentCompleteHeading).toBeVisible();
    });
  }

  assertBillPaymentSuccessDetails(payeeName, amount, fromAccountNumber) {
    const formattedAmount = Number(amount).toFixed(2);
    const expectedText = `Bill Payment to ${payeeName} in the amount of $${formattedAmount} from account ${fromAccountNumber} was successful.`;
    return this.step(
      `Assert payment success message contains payee, amount and account`,
      async () => {
        await expect(this.page.getByText(expectedText)).toBeVisible();
      },
    );
  }

  async getSelectedFromAccount() {
    return await this.fromAccountField.inputValue();
  }
}
