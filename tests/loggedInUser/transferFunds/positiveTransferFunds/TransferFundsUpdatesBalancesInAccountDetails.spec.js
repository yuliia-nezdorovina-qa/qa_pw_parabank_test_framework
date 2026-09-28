import { expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { test as base } from '../../../_fixtures/fixtures';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';

base.describe('Transfer funds updates balances in Account Details', () => {
  base.beforeEach(async ({ page, user }) => {
    await registerUser(page, user);
  });

  base(
    'FROM account balance decreases by transferred amount',
    async ({
      homePage,
      accountOverviewPage,
      transferFundsPage,
      accountDetailsPage,
      openNewAccountTypeSavings,
      openNewAccountTypeChecking,
    }) => {
      const fromAccountId = openNewAccountTypeSavings;
      const toAccountId = openNewAccountTypeChecking;
      const amount = '50';

      await homePage.clickAccountsOverviewLink();
      await accountOverviewPage.assertAccountIsVisible(fromAccountId);
      await accountOverviewPage.assertAccountIsVisible(toAccountId);

      await accountOverviewPage.clickAccountId(fromAccountId);
      const fromBalanceBefore = await accountDetailsPage.getBalance();
      const fromAvailableBefore =
        await accountDetailsPage.getAvailableBalance();

      await transferFundsPage.open();
      await transferFundsPage.fillAmountField(amount);
      await transferFundsPage.selectFromAccount(fromAccountId);
      await transferFundsPage.selectToAccount(toAccountId);
      await transferFundsPage.clickTransferButton();
      await transferFundsPage.assertTransferCompleteHeadingIsVisible();

      await homePage.clickAccountsOverviewLink();
      await accountOverviewPage.clickAccountId(fromAccountId);
      await accountDetailsPage.verifyAccountNumber(fromAccountId);

      const fromBalanceAfter = await accountDetailsPage.getBalance();
      const fromAvailableAfter = await accountDetailsPage.getAvailableBalance();

      expect(fromBalanceAfter).toBeCloseTo(
        fromBalanceBefore - Number(amount),
        2,
      );
      expect(fromAvailableAfter).toBeCloseTo(
        fromAvailableBefore - Number(amount),
        2,
      );
    },
  );

  base(
    'TO account balance increases by transferred amount',
    async ({
      homePage,
      accountOverviewPage,
      transferFundsPage,
      accountDetailsPage,
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

      await accountOverviewPage.clickAccountId(toAccountId);
      const toBalanceBefore = await accountDetailsPage.getBalance();
      const toAvailableBefore = await accountDetailsPage.getAvailableBalance();

      await transferFundsPage.open();
      await transferFundsPage.fillAmountField(amount);
      await transferFundsPage.selectFromAccount(fromAccountId);
      await transferFundsPage.selectToAccount(toAccountId);
      await transferFundsPage.clickTransferButton();
      await transferFundsPage.assertTransferCompleteHeadingIsVisible();

      await homePage.clickAccountsOverviewLink();
      await accountOverviewPage.clickAccountId(toAccountId);
      await accountDetailsPage.verifyAccountNumber(toAccountId);

      const toBalanceAfter = await accountDetailsPage.getBalance();
      const toAvailableAfter = await accountDetailsPage.getAvailableBalance();

      expect(toBalanceAfter).toBeCloseTo(toBalanceBefore + Number(amount), 2);
      expect(toAvailableAfter).toBeCloseTo(
        toAvailableBefore + Number(amount),
        2,
      );
    },
  );
});
