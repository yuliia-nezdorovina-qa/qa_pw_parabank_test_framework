import { test as base } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';

base.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});

base.describe('Find Transactions with empty fields', () => {
  base(
    'Empty "Find by Transaction ID" shows validation error',
    async ({ findTransactionsPage }) => {
      await allure.severity(`minor`);
      await findTransactionsPage.open();
      await findTransactionsPage.clickFindByTransactionIDButton();
      await findTransactionsPage.assertInvalidTransactionIDMessageIsVisible();
    },
  );

  base(
    'Empty "Find by Date" shows validation error',
    async ({ findTransactionsPage }) => {
      await allure.severity(`minor`);
      await findTransactionsPage.open();
      await findTransactionsPage.clickFindByDateButton();
      await findTransactionsPage.assertInvalidDateFormatMessageIsVisible();
    },
  );

  base(
    'Empty "Find by Date Range" shows validation error',
    async ({ findTransactionsPage }) => {
      await allure.severity(`minor`);
      await findTransactionsPage.open();
      await findTransactionsPage.clickFindByDateRangeButton();
      await findTransactionsPage.assertInvalidDateRangeMessageIsVisible();
    },
  );

  base(
    'Empty "Find by Amount" shows validation error',
    async ({ findTransactionsPage }) => {
      await allure.severity(`minor`);
      await findTransactionsPage.open();
      await findTransactionsPage.clickFindByAmountButton();
      await findTransactionsPage.assertInvalidAmountMessageIsVisible();
    },
  );
});
