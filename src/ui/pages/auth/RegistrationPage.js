import { expect, testStep } from '../../../common/helpers/pwHelpers';

export class RegistrationPage {
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
    this.ssnField = page.locator('[id="customer\\.ssn"]');
    this.userNameField = page.locator('[id="customer\\.username"]');
    this.passwordField = page.locator('[id="customer\\.password"]');
    this.confirmPasswordField = page.locator('#repeatedPassword');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.logOutButton = page.getByRole('link', { name: 'Log Out' });
    this.billPayLink = page.getByRole('link', { name: 'Bill Pay' });
  }

  async step(title, stepToRun) {
    return await testStep(title, stepToRun, this.userId);
  }

  errorMessage(errorMessage) {
    return this.page.getByText(errorMessage);
  }

  async open() {
    await this.step(`Open 'Register' page`, async () => {
      await this.page.goto('register.htm');
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

  async fillSsnField(ssn) {
    await this.step(`Fill "SSN" field`, async () => {
      await this.ssnField.fill(ssn);
    });
  }

  async fillUsernameField(username) {
    await this.step(`Fill "Username" field`, async () => {
      await this.userNameField.fill(username);
    });
  }

  async fillPasswordField(password) {
    await this.step(`Fill "Password" field`, async () => {
      await this.passwordField.fill(password);
    });
  }

  async fillConfirmPasswordField(confirmPassword) {
    await this.step(`Fill "Confirm" field`, async () => {
      await this.confirmPasswordField.fill(confirmPassword);
    });
  }

  async clickRegisterButton() {
    await this.step(`Click "Register" button`, async () => {
      await this.registerButton.click();
    });
  }
  async clickLogOutButton() {
    await this.step(`Click "Log Out" button`, async () => {
      await this.logOutButton.click();
    });
  }

  async assertErrorMessageContainsText(messageText) {
    await this.step(`Assert the '${messageText}' error is shown`, async () => {
      await expect(this.errorMessage(messageText)).toBeVisible();
    });
  }

  async submitRegistrationForm(user) {
    await this.step(`Fill the 'Registration' form`, async () => {
      await this.fillFirstNameField(user.firstName);
      await this.fillLastNameField(user.lastName);
      await this.fillAddressField(user.address);
      await this.fillCityField(user.city);
      await this.fillStateField(user.state);
      await this.fillZipCodeField(user.zipCode);
      await this.fillPhoneField(user.phone);
      await this.fillSsnField(user.ssn);
      await this.fillUsernameField(user.username);
      await this.fillPasswordField(user.password);
      await this.fillConfirmPasswordField(user.password);
      await this.clickRegisterButton();
    });
  }

  async clickBillPayLink() {
    await this.step('Click "Bill Pay" link', async () => {
      await this.billPayLink.click();
    });
  }
}
