import * as path from 'path';
import * as fs from 'fs';
import { faker } from '@faker-js/faker';
import { test } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';
import { generateNewUserData } from '../../../../src/common/testData/generateNewUserData';
import { ACCOUNT_NUMBERS_NOT_MATCH } from '../../../../src/ui/constants/billPayMessages';

const payeeData = generateNewUserData();

const amountNumber = '100';
const accountNumber = faker.string.numeric(5);
const verifyAccountNumber = (Number(accountNumber) + 3)
  .toString()
  .padStart(accountNumber.length, '0');

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

const basePayeeData = {
  payeeName: payeeData.username,
  address: payeeData.address,
  city: payeeData.city,
  state: payeeData.state,
  zipCode: payeeData.zipCode,
  phoneNumber: payeeData.phone,
  amount: amountNumber,
};

test.describe('Bill payment Account Number Mismatch', () => {
  test.use({ storageState: storageStatePath });

  test(`Bill payment with Account number Mismatch`, async ({ billPayPage }) => {
    await allure.severity(`minor`);
    await billPayPage.open();

    await billPayPage.fillPayeeNameField(basePayeeData.payeeName);
    await billPayPage.fillAddressField(basePayeeData.address);
    await billPayPage.fillCityField(basePayeeData.city);
    await billPayPage.fillStateField(basePayeeData.state);
    await billPayPage.fillZipCodeField(basePayeeData.zipCode);
    await billPayPage.fillPhoneNumberField(basePayeeData.phoneNumber);
    await billPayPage.fillAccountNumberField(accountNumber);
    await billPayPage.fillVerifyAccountNumberField(verifyAccountNumber);
    await billPayPage.fillAmountField(basePayeeData.amount);

    await billPayPage.clickSendPaymentButton();
    await billPayPage.assertErrorMessageContainsText(ACCOUNT_NUMBERS_NOT_MATCH);
  });
});
