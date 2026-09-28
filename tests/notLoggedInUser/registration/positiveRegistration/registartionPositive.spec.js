import { test } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { generateNewUserData } from '../../../../src/common/testData/generateNewUserData';
import { ACCOUNT_SUCCESS_MESSAGE } from '../../../../src/ui/constants/registrationSuccessMessages';

const user = generateNewUserData();

test('Successful `Registration` flow test', async ({
  registrationPage,
  homePage,
}) => {
  await allure.severity(`critical`);
  await registrationPage.open();
  await registrationPage.fillFirstNameField(user.firstName);
  await registrationPage.fillLastNameField(user.lastName);
  await registrationPage.fillAddressField(user.address);
  await registrationPage.fillCityField(user.city);
  await registrationPage.fillStateField(user.state);
  await registrationPage.fillZipCodeField(user.zipCode);
  await registrationPage.fillPhoneField(user.phone);
  await registrationPage.fillSsnField(user.ssn);
  await registrationPage.fillUsernameField(user.username);
  await registrationPage.fillPasswordField(user.password);
  await registrationPage.fillConfirmPasswordField(user.password);
  await registrationPage.clickRegisterButton();
  await homePage.assertSuccessMessageContainsText(ACCOUNT_SUCCESS_MESSAGE);
  await homePage.assertUserNameIsVisible(user.username);
});
