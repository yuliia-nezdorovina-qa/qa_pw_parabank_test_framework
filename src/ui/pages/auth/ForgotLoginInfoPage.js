import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class ForgotLoginInfoPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('#firstName');
    this.lastNameField = page.locator('#lastName');
    this.addressField = page.locator('[id="address\\.street"]');
    this.cityField = page.locator('[id="address\\.city"]');
    this.stateField = page.locator('[id="address\\.state"]');
    this.zipCodeField = page.locator('[id="address\\.zipCode"]');
    this.ssnField = page.locator('#ssn');
    this.findMyLoginInfoButton = page.getByRole('button', {
      name: 'Find My Login Info',
    });
    this.loginInfoSuccessMessage = page.getByText('Your login information was');
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  errorMessage(errorMessage) {
    return this.page.getByText(errorMessage);
  }

  async open() {
    await this.step(`Open 'Customer Lookup' page`, async () => {
      await this.page.goto('lookup.htm');
    });
  }

  async fillFirstNameField(firstName) {
    await this.step(`Fill "First Name" field`, async () => {
      await this.firstNameField.fill(firstName);
    });
  }

  async fillLastNameField(lastName) {
    await this.step(`Fill "Last Name" field`, async () => {
      await this.lastNameField.fill(lastName);
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

  async fillSsnField(ssn) {
    await this.step(`Fill "SSN" field`, async () => {
      await this.ssnField.fill(ssn);
    });
  }

  async clickFindMyLoginInfoButton() {
    await this.step(`Click "Find My Login Info" button`, async () => {
      await this.findMyLoginInfoButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage(messageText)).toBeVisible();
    });
  }
  async assertSucessMessageContainsText(messageText) {
    await this.step(
      `Assert the '${messageText}' message is shown`,
      async () => {
        await expect(this.loginInfoSuccessMessage).toContainText(messageText);
      },
    );
  }
}
