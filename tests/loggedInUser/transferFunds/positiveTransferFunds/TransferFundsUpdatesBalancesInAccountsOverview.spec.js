import { expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { test as base } from '../../../_fixtures/fixtures';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';

base.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});

base(
  'Transfer funds updates balances in Accounts Overview',
  async ({
    homePage,
    accountOverviewPage,
    transferFundsPage,
    openNewAccountTypeSavings,
    openNewAccountTypeChecking,
  }) => {
    await allure.severity(`critical`);
    const fromAccountId = openNewAccountTypeSavings;
    const toAccountId = openNewAccountTypeChecking;
    const amount = '50';

    await homePage.clickAccountsOverviewLink();
    await accountOverviewPage.assertAccountIsVisible(fromAccountId);
    await accountOverviewPage.assertAccountIsVisible(toAccountId);

    const fromBalanceBefore =
      await accountOverviewPage.getAccountBalance(fromAccountId);
    const toBalanceBefore =
      await accountOverviewPage.getAccountBalance(toAccountId);

    await transferFundsPage.open();
    await transferFundsPage.fillAmountField(amount);
    await transferFundsPage.selectFromAccount(fromAccountId);
    await transferFundsPage.selectToAccount(toAccountId);
    await transferFundsPage.clickTransferButton();
    await transferFundsPage.assertTransferCompleteHeadingIsVisible();

    await homePage.clickAccountsOverviewLink();
    const fromBalanceAfter =
      await accountOverviewPage.getAccountBalance(fromAccountId);
    const toBalanceAfter =
      await accountOverviewPage.getAccountBalance(toAccountId);

    expect(fromBalanceAfter).toBeCloseTo(fromBalanceBefore - Number(amount), 2);
    expect(toBalanceAfter).toBeCloseTo(toBalanceBefore + Number(amount), 2);
  },
);
