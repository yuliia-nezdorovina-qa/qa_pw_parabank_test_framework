import { expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { test as base } from '../../../_fixtures/fixtures';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';

base.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});

base(
  'Find Transactions by Transaction ID returns correct transaction',
  async ({
    homePage,
    accountOverviewPage,
    transferFundsPage,
    findTransactionsPage,
    openNewAccountTypeSavings,
    openNewAccountTypeChecking,
  }) => {
    await allure.severity(`normal`);
    const fromAccountId = openNewAccountTypeSavings;
    const toAccountId = openNewAccountTypeChecking;
    const amount = '50';

    await homePage.clickAccountsOverviewLink();
    await accountOverviewPage.assertAccountIsVisible(fromAccountId);
    await accountOverviewPage.assertAccountIsVisible(toAccountId);

    await transferFundsPage.open();
    await transferFundsPage.fillAmountField(amount);
    await transferFundsPage.selectFromAccount(fromAccountId);
    await transferFundsPage.selectToAccount(toAccountId);
    await transferFundsPage.clickTransferButton();
    await transferFundsPage.assertTransferCompleteHeadingIsVisible();

    await findTransactionsPage.open();
    await findTransactionsPage.selectAccountById(toAccountId);
    await findTransactionsPage.fillFindByAmountField(amount);
    await findTransactionsPage.clickFindByAmountButton();
    await findTransactionsPage.assertTransactionResultsHeadingIsVisible();

    const transactionId = await findTransactionsPage.getTransactionIdFromRow(0);
    expect(transactionId).not.toBeNull();

    await findTransactionsPage.open();
    await findTransactionsPage.selectAccountById(toAccountId);
    await findTransactionsPage.fillFindByTransactionIDField(transactionId);
    await findTransactionsPage.clickFindByTransactionIDButton();
    await findTransactionsPage.assertTransactionResultsHeadingIsVisible();

    const resultsCount =
      await findTransactionsPage.getTransactionResultsCount();
    expect(resultsCount).toBe(1);
  },
);
