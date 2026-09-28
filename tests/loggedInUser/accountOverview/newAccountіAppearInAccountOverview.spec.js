import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';

test.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});

test(`Newly created accounts are visible in Accounts Overview`, async ({
  homePage,
  accountOverviewPage,
  openNewAccountTypeSavings,
  openNewAccountTypeChecking,
}) => {
  await allure.severity(`normal`);
  await homePage.clickAccountsOverviewLink();
  await accountOverviewPage.assertAccountIsVisible(openNewAccountTypeSavings);
  await accountOverviewPage.assertAccountIsVisible(openNewAccountTypeChecking);
});
