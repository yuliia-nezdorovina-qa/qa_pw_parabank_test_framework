import { test } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';

test.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});

test(`Transfer funds with Empty amount`, async ({ transferFundsPage }) => {
  await allure.severity(`minor`);
  await transferFundsPage.open();
  await transferFundsPage.clickTransferButton();

  await transferFundsPage.assertTransferErrorMessageIsShown();
});
