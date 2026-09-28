import { expect } from '@playwright/test';
import { test as base } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';
import { NO_TRANSACTIONS_FOUND } from '../../../src/ui/constants/accountMessages';

base.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});

base(
  'Newly registered user has a default CHECKING account with no transactions',
  async ({ homePage, accountOverviewPage, accountDetailsPage }) => {
    await allure.severity(`normal`);
    await homePage.clickAccountsOverviewLink();

    const accountId = await accountOverviewPage.getFirstAccountId();
    const overviewBalance =
      await accountOverviewPage.getAccountBalance(accountId);
    const overviewAvailableAmount =
      await accountOverviewPage.getAvailableAmount(accountId);

    await accountOverviewPage.clickAccountId(accountId);

    await accountDetailsPage.verifyAccountNumber(accountId);
    await accountDetailsPage.verifyAccountType('CHECKING');

    const detailsBalance = await accountDetailsPage.getBalance();
    const detailsAvailableBalance =
      await accountDetailsPage.getAvailableBalance();

    expect(detailsBalance).toBe(overviewBalance);
    expect(detailsAvailableBalance).toBe(overviewAvailableAmount);
    expect(detailsBalance).toBe(detailsAvailableBalance);

    await accountDetailsPage.assertNoTransactionsFoundMessageContainsText(
      NO_TRANSACTIONS_FOUND,
    );
  },
);
