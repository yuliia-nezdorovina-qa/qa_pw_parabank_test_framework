import * as path from 'path';
import * as fs from 'fs';
import { faker } from '@faker-js/faker';
import { test } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import {
  EMPTY_PAYEE_NAME_MESSAGE,
  EMPTY_ADDRESS_MESSAGE,
  EMPTY_CITY_MESSAGE,
  EMPTY_STATE_MESSAGE,
  EMPTY_ZIPCODE_MESSAGE,
  EMPTY_PHONE_NUMBER_MESSAGE,
  EMPTY_AMOUNT_MESSAGE,
} from '../../../../src/ui/constants/billPayMessages';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';
import { generateNewUserData } from '../../../../src/common/testData/generateNewUserData';

const payeeData = generateNewUserData();
const amountNumber = '100';
const accountNumber = faker.string.numeric(5);

const storageStatePath = path.join(__dirname, `.auth/user-${Date.now()}.json`);

test.beforeAll(async ({ browser }) => {
  const payerContext = await browser.newContext({ storageState: undefined });
  const payerPage = await payerContext.newPage();

  const user1 = generateNewUserData();
  await registerUser(payerPage, user1);

  const authDir = path.dirname(storageStatePath);
  if (!fs.existsSync(authDir)) {
    fs.mkdirSync(authDir, { recursive: true });
  }

  await payerContext.storageState({ path: storageStatePath });
  await payerContext.close();
});

test.afterAll(async () => {
  if (fs.existsSync(storageStatePath)) {
    fs.rmSync(storageStatePath);
  }
});

const testParameters = [
  {
    payeeName: '',
    address: payeeData.address,
    city: payeeData.city,
    state: payeeData.state,
    zipCode: payeeData.zipCode,
    phoneNumber: payeeData.phone,
    accountNumber: accountNumber,
    verifyAccountNumber: accountNumber,
    amount: amountNumber,
    title: 'empty payee name',
    message: EMPTY_PAYEE_NAME_MESSAGE,
  },
  {
    payeeName: payeeData.username,
    address: '',
    city: payeeData.city,
    state: payeeData.state,
    zipCode: payeeData.zipCode,
    phoneNumber: payeeData.phone,
    accountNumber: accountNumber,
    verifyAccountNumber: accountNumber,
    amount: amountNumber,
    title: 'empty address',
    message: EMPTY_ADDRESS_MESSAGE,
  },
  {
    payeeName: payeeData.username,
    address: payeeData.address,
    city: '',
    state: payeeData.state,
    zipCode: payeeData.zipCode,
    phoneNumber: payeeData.phone,
    accountNumber: accountNumber,
    verifyAccountNumber: accountNumber,
    amount: amountNumber,
    title: 'empty city',
    message: EMPTY_CITY_MESSAGE,
  },
  {
    payeeName: payeeData.username,
    address: payeeData.address,
    city: payeeData.city,
    state: '',
    zipCode: payeeData.zipCode,
    phoneNumber: payeeData.phone,
    accountNumber: accountNumber,
    verifyAccountNumber: accountNumber,
    amount: amountNumber,
    title: 'empty state',
    message: EMPTY_STATE_MESSAGE,
  },
  {
    payeeName: payeeData.username,
    address: payeeData.address,
    city: payeeData.city,
    state: payeeData.state,
    zipCode: '',
    phoneNumber: payeeData.phone,
    accountNumber: accountNumber,
    verifyAccountNumber: accountNumber,
    amount: amountNumber,
    title: 'empty zip code',
    message: EMPTY_ZIPCODE_MESSAGE,
  },
  {
    payeeName: payeeData.username,
    address: payeeData.address,
    city: payeeData.city,
    state: payeeData.state,
    zipCode: payeeData.zipCode,
    phoneNumber: '',
    accountNumber: accountNumber,
    verifyAccountNumber: accountNumber,
    amount: amountNumber,
    title: 'empty phone number',
    message: EMPTY_PHONE_NUMBER_MESSAGE,
  },
  {
    payeeName: payeeData.username,
    address: payeeData.address,
    city: payeeData.city,
    state: payeeData.state,
    zipCode: payeeData.zipCode,
    phoneNumber: payeeData.phone,
    accountNumber: accountNumber,
    verifyAccountNumber: accountNumber,
    amount: '',
    title: 'empty amount',
    message: EMPTY_AMOUNT_MESSAGE,
  },
];

test.describe('Bill payment with empty required fields', () => {
  test.use({ storageState: storageStatePath });

  testParameters.forEach(
    ({
      payeeName,
      address,
      city,
      state,
      zipCode,
      phoneNumber,
      accountNumber,
      verifyAccountNumber,
      amount,
      title,
      message,
    }) => {
      test(`Bill payment with ${title}`, async ({ billPayPage }) => {
        await allure.severity(`minor`);
        await billPayPage.open();
        await billPayPage.fillPayeeNameField(payeeName);
        await billPayPage.fillAddressField(address);
        await billPayPage.fillCityField(city);
        await billPayPage.fillStateField(state);
        await billPayPage.fillZipCodeField(zipCode);
        await billPayPage.fillPhoneNumberField(phoneNumber);
        await billPayPage.fillAccountNumberField(accountNumber);
        await billPayPage.fillVerifyAccountNumberField(verifyAccountNumber);
        await billPayPage.fillAmountField(amount);
        await billPayPage.clickSendPaymentButton();
        await billPayPage.assertErrorMessageContainsText(message);
      });
    },
  );
});
