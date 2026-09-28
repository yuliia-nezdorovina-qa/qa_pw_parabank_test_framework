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
  EMPTY_USERNAME_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
  EMPTY_PASSWORD_CONFIRMATION_MESSAGE,
} from '../../../../src/ui/constants/registrationErrorMessages';
import { generateNewUserData } from '../../../../src/common/testData/generateNewUserData';

const user = generateNewUserData();
const testParameters = [
  {
    firstName: '',
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    ssn: user.ssn,
    username: user.username,
    password: user.password,
    confirmPassword: user.confirmPassword,
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
    phone: user.phone,
    ssn: user.ssn,
    username: user.username,
    password: user.password,
    confirmPassword: user.confirmPassword,
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
    phone: user.phone,
    ssn: user.ssn,
    username: user.username,
    password: user.password,
    confirmPassword: user.confirmPassword,
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
    phone: user.phone,
    ssn: user.ssn,
    username: user.username,
    password: user.password,
    confirmPassword: user.confirmPassword,
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
    phone: user.phone,
    ssn: user.ssn,
    username: user.username,
    password: user.password,
    confirmPassword: user.confirmPassword,
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
    phone: user.phone,
    ssn: user.ssn,
    username: user.username,
    password: user.password,
    confirmPassword: user.confirmPassword,
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
    phone: user.phone,
    ssn: '',
    username: user.username,
    password: user.password,
    confirmPassword: user.confirmPassword,
    title: 'empty ssn',
    message: EMPTY_SSN_MESSAGE,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    ssn: user.ssn,
    username: '',
    password: user.password,
    confirmPassword: user.confirmPassword,
    title: 'empty username',
    message: EMPTY_USERNAME_MESSAGE,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    ssn: user.ssn,
    username: user.username,
    password: '',
    confirmPassword: user.confirmPassword,
    title: 'empty password',
    message: EMPTY_PASSWORD_MESSAGE,
  },
  {
    firstName: user.firstName,
    lastName: user.lastName,
    address: user.address,
    city: user.city,
    state: user.state,
    zipCode: user.zipCode,
    phone: user.phone,
    ssn: user.ssn,
    username: user.username,
    password: user.password,
    confirmPassword: '',
    title: 'empty password confirmation',
    message: EMPTY_PASSWORD_CONFIRMATION_MESSAGE,
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
    phone,
    ssn,
    username,
    password,
    confirmPassword,
    title,
    message,
  }) => {
    test.describe('Registartion with empty required fields', () => {
      test(`Register with ${title}`, async ({ registrationPage }) => {
        await allure.severity(`minor`);
        await registrationPage.open();
        await registrationPage.fillFirstNameField(firstName);
        await registrationPage.fillLastNameField(lastName);
        await registrationPage.fillAddressField(address);
        await registrationPage.fillCityField(city);
        await registrationPage.fillStateField(state);
        await registrationPage.fillZipCodeField(zipCode);
        await registrationPage.fillPhoneField(phone);
        await registrationPage.fillSsnField(ssn);
        await registrationPage.fillUsernameField(username);
        await registrationPage.fillPasswordField(password);
        await registrationPage.fillConfirmPasswordField(confirmPassword);
        await registrationPage.clickRegisterButton();
        await registrationPage.assertErrorMessageContainsText(message);
      });
    });
  },
);
