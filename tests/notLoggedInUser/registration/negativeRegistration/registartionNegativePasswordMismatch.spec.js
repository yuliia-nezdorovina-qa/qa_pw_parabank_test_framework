import { test } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { PASSWORDS_DID_NOT_MATCH_MESSAGE } from '../../../../src/ui/constants/registrationErrorMessages';
import { generateNewUserData } from '../../../../src/common/testData/generateNewUserData';

const user = generateNewUserData();

test.describe('Registration with mismatched passwords', () => {
  test('Register with passwords that do not match', async ({
    registrationPage,
  }) => {
    await allure.severity(`minor`);
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
    await registrationPage.fillConfirmPasswordField(
      user.password + '_different',
    );
    await registrationPage.clickRegisterButton();
    await registrationPage.assertErrorMessageContainsText(
      PASSWORDS_DID_NOT_MATCH_MESSAGE,
    );
  });
});
