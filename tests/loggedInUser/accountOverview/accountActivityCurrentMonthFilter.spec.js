import { expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { test as base } from '../../_fixtures/fixtures';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';

base.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});

base(
  `Account Activity filter by current month shows today's transaction`,
  async ({
    homePage,
    accountOverviewPage,
    transferFundsPage,
    accountDetailsPage,
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

    await homePage.clickAccountsOverviewLink();
    await accountOverviewPage.clickAccountId(toAccountId);
    await accountDetailsPage.verifyAccountNumber(toAccountId);

    const currentMonth = accountDetailsPage.getCurrentMonthName();
    await accountDetailsPage.selectActivityPeriod(currentMonth);
    await accountDetailsPage.selectTransactionType('All');
    await accountDetailsPage.clickGoButton();

    const rowsCount = await accountDetailsPage.getTransactionRowsCount();
    expect(rowsCount).toBeGreaterThan(0);

    await accountDetailsPage.assertAllTransactionDatesAreToday();
  },
);
