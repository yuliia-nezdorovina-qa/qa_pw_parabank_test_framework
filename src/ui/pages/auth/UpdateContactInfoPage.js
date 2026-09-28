import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class UpdateContactInfoPage {
  constructor(page, userId = 0) {
    this.page = page;
    this.userId = userId;
    this.firstNameField = page.locator('[id="customer\\.firstName"]');
    this.lastNameField = page.locator('[id="customer\\.lastName"]');
    this.addressField = page.locator('[id="customer\\.address\\.street"]');
    this.cityField = page.locator('[id="customer\\.address\\.city"]');
    this.stateField = page.locator('[id="customer\\.address\\.state"]');
    this.zipCodeField = page.locator('[id="customer\\.address\\.zipCode"]');
    this.phoneField = page.locator('[id="customer\\.phoneNumber"]');
    this.updateProfileButton = page.getByRole('button', {
      name: 'Update Profile',
    });
    this.profileUpdatedSuccessMessage = page.getByText(
      'Your updated address and',
    );
    this.profileUpdatedHeading = page.getByRole('heading', {
      name: 'Profile Updated',
    });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  errorMessage(errorMessage) {
    return this.page.getByText(errorMessage);
  }

  async open() {
    await this.step(`Open 'Update Contact Info' page`, async () => {
      await this.page.goto('updateprofile.htm');
      await expect(this.firstNameField).not.toHaveValue('');
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

  async fillPhoneField(phone) {
    await this.step(`Fill "Phone" field`, async () => {
      await this.phoneField.fill(phone);
    });
  }

  async clickUpdateProfileButton() {
    await this.step(`Click "Update Profile" button`, async () => {
      await this.updateProfileButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage(messageText)).toBeVisible();
    });
  }
  async assertProfileUpdatedMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' is shown`, async () => {
      await expect(this.profileUpdatedSuccessMessage).toContainText(
        messageText,
      );
    });
  }

  async assertProfileUpdatedHeadingIsVisible() {
    await this.step('Assert "Profile Updated" heading is shown', async () => {
      await expect(this.profileUpdatedHeading).toBeVisible();
    });
  }

  async getFirstNameValue() {
    return await this.firstNameField.inputValue();
  }

  async getLastNameValue() {
    return await this.lastNameField.inputValue();
  }

  async getAddressValue() {
    return await this.addressField.inputValue();
  }

  async getCityValue() {
    return await this.cityField.inputValue();
  }

  async getStateValue() {
    return await this.stateField.inputValue();
  }

  async getZipCodeValue() {
    return await this.zipCodeField.inputValue();
  }

  async getPhoneValue() {
    return await this.phoneField.inputValue();
  }
}
