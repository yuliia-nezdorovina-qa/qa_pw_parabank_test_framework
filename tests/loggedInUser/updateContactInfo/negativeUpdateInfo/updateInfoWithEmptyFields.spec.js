import { test } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';
import {
  EMPTY_FIRSTNAME_MESSAGE,
  EMPTY_LASTNAME_MESSAGE,
  EMPTY_ADDRESS_MESSAGE,
  EMPTY_CITY_MESSAGE,
  EMPTY_STATE_MESSAGE,
  EMPTY_ZIPCODE_MESSAGE,
} from '../../../../src/ui/constants/updateContactInfoMessages.js';

const testParameters = [
  {
    title: 'empty First Name',
    firstName: '',
    errorMessage: EMPTY_FIRSTNAME_MESSAGE,
  },
  {
    title: 'empty Last Name',
    lastName: '',
    errorMessage: EMPTY_LASTNAME_MESSAGE,
  },
  {
    title: 'empty Address',
    address: '',
    errorMessage: EMPTY_ADDRESS_MESSAGE,
  },
  {
    title: 'empty City',
    city: '',
    errorMessage: EMPTY_CITY_MESSAGE,
  },
  {
    title: 'empty State',
    state: '',
    errorMessage: EMPTY_STATE_MESSAGE,
  },
  {
    title: 'empty Zip Code',
    zipCode: '',
    errorMessage: EMPTY_ZIPCODE_MESSAGE,
  },
];

test.describe('Update Contact Info with empty fields', () => {
  test.beforeEach(async ({ page, user }) => {
    await registerUser(page, user);
  });

  testParameters.forEach(
    ({
      title,
      firstName,
      lastName,
      address,
      city,
      state,
      zipCode,
      errorMessage,
    }) => {
      test(`User cannot update profile with ${title}`, async ({
        updateContactInfoPage,
      }) => {
        await allure.severity(`minor`);
        await updateContactInfoPage.open();

        if (firstName !== undefined) {
          await updateContactInfoPage.fillFirstNameField(firstName);
        }

        if (lastName !== undefined) {
          await updateContactInfoPage.fillLastNameField(lastName);
        }

        if (address !== undefined) {
          await updateContactInfoPage.fillAddressField(address);
        }

        if (city !== undefined) {
          await updateContactInfoPage.fillCityField(city);
        }

        if (state !== undefined) {
          await updateContactInfoPage.fillStateField(state);
        }

        if (zipCode !== undefined) {
          await updateContactInfoPage.fillZipCodeField(zipCode);
        }

        await updateContactInfoPage.clickUpdateProfileButton();

        await updateContactInfoPage.assertErrorMessageContainsText(
          errorMessage,
        );
      });
    },
  );
});
