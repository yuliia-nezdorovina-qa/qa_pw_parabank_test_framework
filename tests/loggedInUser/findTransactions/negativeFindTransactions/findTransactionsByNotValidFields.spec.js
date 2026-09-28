import { test as base } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';

base.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});

base.describe('Find Transactions with invalid (non-numeric) fields', () => {
  const invalidText = 'abcdef';

  base(
    'Non-numeric "Find by Transaction ID" shows validation error',
    async ({ findTransactionsPage }) => {
      await allure.severity(`minor`);
      await findTransactionsPage.open();
      await findTransactionsPage.fillFindByTransactionIDField(invalidText);
      await findTransactionsPage.clickFindByTransactionIDButton();
      await findTransactionsPage.assertInvalidTransactionIDMessageIsVisible();
    },
  );

  base(
    'Invalid "Find by Date" format shows validation error',
    async ({ findTransactionsPage }) => {
      await allure.severity(`minor`);
      await findTransactionsPage.open();
      await findTransactionsPage.fillFindByDateField(invalidText);
      await findTransactionsPage.clickFindByDateButton();
      await findTransactionsPage.assertInvalidDateFormatMessageIsVisible();
    },
  );

  base(
    'Invalid "Find by Date Range" format shows validation error',
    async ({ findTransactionsPage }) => {
      await allure.severity(`minor`);
      await findTransactionsPage.open();
      await findTransactionsPage.fillFromDateField(invalidText);
      await findTransactionsPage.fillToDateField(invalidText);
      await findTransactionsPage.clickFindByDateRangeButton();
      await findTransactionsPage.assertInvalidDateRangeMessageIsVisible();
    },
  );

  base(
    'Non-numeric "Find by Amount" shows validation error',
    async ({ findTransactionsPage }) => {
      await allure.severity(`minor`);
      await findTransactionsPage.open();
      await findTransactionsPage.fillFindByAmountField(invalidText);
      await findTransactionsPage.clickFindByAmountButton();
      await findTransactionsPage.assertInvalidAmountMessageIsVisible();
    },
  );
});
