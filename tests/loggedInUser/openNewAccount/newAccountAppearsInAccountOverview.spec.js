import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';
import { CONGRATULATIONS_ACCOUNT_OPEN_MESSAGE } from '../../../src/ui/constants/accountMessages';

test.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});

test(`New account appears in Accounts Overview`, async ({
  homePage,
  accountOverviewPage,
  openNewAccountPage,
}) => {
  await allure.severity(`critical`);
  const accountType = 'SAVINGS';
  await homePage.clickAccountsOverviewLink();
  await accountOverviewPage.clickOpenNewAccountLink();
  await openNewAccountPage.assertOpenNewAccountHeaderIsVisible();
  await openNewAccountPage.selectAccountType(accountType);
  await openNewAccountPage.selectFirstFromAccount();
  await openNewAccountPage.clickOpenNewAccountButton();
  await openNewAccountPage.assertCongratulationsMessageContainsText(
    CONGRATULATIONS_ACCOUNT_OPEN_MESSAGE,
  );
  const newAccountId = await openNewAccountPage.getNewAccountId();
  await homePage.clickAccountsOverviewLink();
  await accountOverviewPage.assertAccountIsVisible(newAccountId);
});
