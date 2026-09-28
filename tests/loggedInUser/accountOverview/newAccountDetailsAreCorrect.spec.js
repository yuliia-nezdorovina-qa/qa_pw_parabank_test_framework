import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';
import { CONGRATULATIONS_ACCOUNT_OPEN_MESSAGE } from '../../../src/ui/constants/accountMessages';

test.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});

test(`New account has correct number and type in Account Details`, async ({
  homePage,
  accountOverviewPage,
  openNewAccountPage,
  accountDetailsPage,
}) => {
  await allure.severity(`normal`);
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
  await accountOverviewPage.clickAccountId(newAccountId);
  await accountDetailsPage.verifyAccountNumber(newAccountId);
  await accountDetailsPage.verifyAccountType(accountType);
});
