import { test as base } from '@playwright/test';
import { AccountOverviewPage } from '../../src/ui/pages/auth/AccountOverviewPage';
import { OpenNewAccountPage } from '../../src/ui/pages/auth/OpenNewAccountPage';
import { AccountDetailsPage } from '../../src/ui/pages/auth/AccountDetailsPage';
import { openNewAccountTypeSavings } from '../../src/ui/actions/account/openNewAccountTypeSavings';
import { openNewAccountTypeChecking } from '../../src/ui/actions/account/openNewAccountTypeChecking';
import { BillPayPage } from '../../src/ui/pages/auth/BillPayPage';
import { TransferFundsPage } from '../../src/ui/pages/auth/TransferFundsPage';
import { FindTransactionsPage } from '../../src/ui/pages/auth/FindTransactionsPage';
import { RequestLoanPage } from '../../src/ui/pages/auth/RequestLoanPage';

export const test = base.extend<{
  accountOverviewPage;
  openNewAccountPage;
  accountDetailsPage;
  openNewAccountTypeSavings;
  openNewAccountTypeChecking;
  billPayPage;
}>({
  accountOverviewPage: async ({ page }, use) => {
    const accountOverviewPage = new AccountOverviewPage(page);

    await use(accountOverviewPage);
  },
  openNewAccountPage: async ({ page }, use) => {
    const openNewAccountPage = new OpenNewAccountPage(page);

    await use(openNewAccountPage);
  },
  accountDetailsPage: async ({ page }, use) => {
    const accountDetailsPage = new AccountDetailsPage(page);

    await use(accountDetailsPage);
  },
  billPayPage: async ({ page }, use) => {
    const billPayPage = new BillPayPage(page);

    await use(billPayPage);
  },
  transferFundsPage: async ({ page }, use) => {
    const transferFundsPage = new TransferFundsPage(page);

    await use(transferFundsPage);
  },
  findTransactionsPage: async ({ page }, use) => {
    const findTransactionsPage = new FindTransactionsPage(page);

    await use(findTransactionsPage);
  },
  requestLoanPage: async ({ page }, use) => {
    const requestLoanPage = new RequestLoanPage(page);

    await use(requestLoanPage);
  },
  openNewAccountTypeSavings: async ({ page }, use) => {
    const newAccountId = await openNewAccountTypeSavings(page);
    await use(newAccountId);
  },
  openNewAccountTypeChecking: async ({ page }, use) => {
    const newAccountId = await openNewAccountTypeChecking(page);
    await use(newAccountId);
  },
});
