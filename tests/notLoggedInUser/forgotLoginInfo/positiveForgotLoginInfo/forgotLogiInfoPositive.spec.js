import { test } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';
import { INFO_SUCCESS_MESSAGE_MESSAGE } from '../../../../src/ui/constants/forgotLoginInfoMessages';

test.beforeEach(async ({ pages, user }) => {
  await registerUser(pages[0], user);
});

test('Successful `Forgot Login Info` flow test', async ({
  forgotLoginInfoPage,
  user,
}) => {
  await allure.severity(`minor`);
  await forgotLoginInfoPage.open();
  await forgotLoginInfoPage.fillFirstNameField(user.firstName);
  await forgotLoginInfoPage.fillLastNameField(user.lastName);
  await forgotLoginInfoPage.fillAddressField(user.address);
  await forgotLoginInfoPage.fillCityField(user.city);
  await forgotLoginInfoPage.fillStateField(user.state);
  await forgotLoginInfoPage.fillZipCodeField(user.zipCode);
  await forgotLoginInfoPage.fillSsnField(user.ssn);
  await forgotLoginInfoPage.clickFindMyLoginInfoButton();
  await forgotLoginInfoPage.assertSuccessMessageContainsText(
    INFO_SUCCESS_MESSAGE_MESSAGE,
  );
});
