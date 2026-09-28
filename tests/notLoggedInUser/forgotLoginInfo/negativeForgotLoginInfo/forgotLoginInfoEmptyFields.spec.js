import { test } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import {
  EMPTY_FIRSTNAME_MESSAGE,
  EMPTY_LASTNAME_MESSAGE,
  EMPTY_ADDRESS_MESSAGE,
  EMPTY_CITY_MESSAGE,
  EMPTY_STATE_MESSAGE,
  EMPTY_ZIPCODE_MESSAGE,
  EMPTY_SSN_MESSAGE,
} from '../../../../src/ui/constants/forgotLoginInfoMessages';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';
import { generateNewUserData } from '../../../../src/common/testData/generateNewUserData';

const user = generateNewUserData();

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await registerUser(page, user);

  await context.close();
});

const testParameters = [
  {
    firstName: '',
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    ssn: user.ssn,
    title: 'empty first name',
    message: EMPTY_FIRSTNAME_MESSAGE,
  },
  {
    firstName: user.firstName,
    lastName: '',
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    ssn: user.ssn,
    title: 'empty last name',
    message: EMPTY_LASTNAME_MESSAGE,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: '',
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    ssn: user.ssn,
    title: 'empty address',
    message: EMPTY_ADDRESS_MESSAGE,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: '',
    state: user.state,
    zipCode: user.zipCode,
    ssn: user.ssn,
    title: 'empty city',
    message: EMPTY_CITY_MESSAGE,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: '',
    zipCode: user.zipCode,
    ssn: user.ssn,
    title: 'empty state',
    message: EMPTY_STATE_MESSAGE,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: '',
    ssn: user.ssn,
    title: 'empty zip code',
    message: EMPTY_ZIPCODE_MESSAGE,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    ssn: '',
    title: 'empty ssn',
    message: EMPTY_SSN_MESSAGE,
  },
];

testParameters.forEach(
  ({
    firstName,
    lastName,
    address,
    city,
    state,
    zipCode,
    ssn,
    title,
    message,
  }) => {
    test.describe('Registartion with empty required fields', () => {
      test(`Register with ${title}`, async ({ forgotLoginInfoPage }) => {
        await allure.severity(`minor`);
        await forgotLoginInfoPage.open();
        await forgotLoginInfoPage.fillFirstNameField(firstName);
        await forgotLoginInfoPage.fillLastNameField(lastName);
        await forgotLoginInfoPage.fillAddressField(address);
        await forgotLoginInfoPage.fillCityField(city);
        await forgotLoginInfoPage.fillStateField(state);
        await forgotLoginInfoPage.fillZipCodeField(zipCode);
        await forgotLoginInfoPage.fillSsnField(ssn);
        await forgotLoginInfoPage.clickFindMyLoginInfoButton();
        await forgotLoginInfoPage.assertErrorMessageContainsText(message);
      });
    });
  },
);
