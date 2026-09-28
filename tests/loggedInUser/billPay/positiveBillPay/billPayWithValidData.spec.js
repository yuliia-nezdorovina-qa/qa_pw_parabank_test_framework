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
  accountNumber: accountNumber,
  verifyAccountNumber: accountNumber,
  amount: amountNumber,
};

test.use({ storageState: storageStatePath });

test(`Bill payment with valid data`, async ({ billPayPage }) => {
  await allure.severity(`critical`);
  await billPayPage.open();
  await billPayPage.fillPayeeNameField(basePayeeData.payeeName);
  await billPayPage.fillAddressField(basePayeeData.address);
  await billPayPage.fillCityField(basePayeeData.city);
  await billPayPage.fillStateField(basePayeeData.state);
  await billPayPage.fillZipCodeField(basePayeeData.zipCode);
  await billPayPage.fillPhoneNumberField(basePayeeData.phoneNumber);
  await billPayPage.fillAccountNumberField(basePayeeData.accountNumber);
  await billPayPage.fillVerifyAccountNumberField(
    basePayeeData.verifyAccountNumber,
  );
  await billPayPage.fillAmountField(basePayeeData.amount);

  const fromAccountNumber = await billPayPage.getSelectedFromAccount();
  await billPayPage.clickSendPaymentButton();
  await billPayPage.assertBillPaymentCompleteHeadingIsVisible();
  await billPayPage.assertBillPaymentSuccessDetails(
    basePayeeData.payeeName,
    basePayeeData.amount,
    fromAccountNumber,
  );
});
