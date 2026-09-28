import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';

test.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});

test(`Account Overview is accessible`, async ({
  homePage,
  accountOverviewPage,
}) => {
  await allure.severity(`normal`);
  await homePage.clickAccountsOverviewLink();
  await accountOverviewPage.assertAccountOverviewIsVisible();
  await accountOverviewPage.assertAccountsTableHeadersAreVisible();
});
