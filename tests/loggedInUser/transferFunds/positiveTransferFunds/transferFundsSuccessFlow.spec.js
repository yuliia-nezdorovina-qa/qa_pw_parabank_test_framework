import { test } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';

test.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});

test(`Transfer funds success flow`, async ({
  transferFundsPage,
  openNewAccountTypeSavings,
  openNewAccountTypeChecking,
}) => {
  await allure.severity(`critical`);
  const amount = '50';
  const fromAccountId = openNewAccountTypeSavings;
  const toAccountId = openNewAccountTypeChecking;

  await transferFundsPage.open();
  await transferFundsPage.fillAmountField(amount);
  await transferFundsPage.selectFromAccount(fromAccountId);
  await transferFundsPage.selectToAccount(toAccountId);
  await transferFundsPage.clickTransferButton();

  await transferFundsPage.assertTransferCompleteHeadingIsVisible();
  await transferFundsPage.assertTransferDetails(
    amount,
    fromAccountId,
    toAccountId,
  );
});
