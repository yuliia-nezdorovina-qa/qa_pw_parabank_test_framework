import * as path from 'path';
import * as fs from 'fs';
import { faker } from '@faker-js/faker';
import { test } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';
import { generateNewUserData } from '../../../../src/common/testData/generateNewUserData';

const payeeData = generateNewUserData();
const amountNumber = '100';
const accountNumber = faker.string.numeric(5);
const notValidData = faker.word.sample({ length: 5 });

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
    payeeName: payeeData.username,
    address: payeeData.address,
    city: payeeData.city,
    state: payeeData.state,
    zipCode: payeeData.zipCode,
    phoneNumber: payeeData.phone,
    accountNumber: notValidData,
    verifyAccountNumber: accountNumber,
    amount: amountNumber,
    title: 'not valid account number',
  },
  {
    payeeName: payeeData.username,
    address: payeeData.address,
    city: payeeData.city,
    state: payeeData.state,
    zipCode: payeeData.zipCode,
    phoneNumber: payeeData.phone,
    accountNumber: accountNumber,
    verifyAccountNumber: notValidData,
    amount: amountNumber,
    title: 'not valid verify account number',
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
    amount: notValidData,
    title: 'not valid amount',
  },
];

test.describe('Bill payment Account Number validation — invalid data', () => {
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

        if (accountNumber === notValidData) {
          await billPayPage.assertAccountNumberInvalid();
        }
        if (verifyAccountNumber === notValidData) {
          await billPayPage.assertVerifyAccountNumberInvalid();
        }
        if (amount === notValidData) {
          await billPayPage.assertAmountNumberInvalid();
        }
      });
    },
  );
});
