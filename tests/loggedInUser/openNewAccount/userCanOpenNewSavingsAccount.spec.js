import { test } from '../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../src/ui/actions/auth/registerUser';
import { CONGRATULATIONS_ACCOUNT_OPEN_MESSAGE } from '../../../src/ui/constants/accountMessages';

test.beforeEach(async ({ pages, user }) => {
  await registerUser(pages[0], user);
});

test(`User can successfully open a new SAVINGS account`, async ({
  homePage,
  accountOverviewPage,
  openNewAccountPage,
  user,
}) => {
  await allure.severity(`critical`);
  await homePage.open();
  await homePage.fillUsernameField(user.username);
  await homePage.fillPasswordField(user.password);
  await homePage.clickLogInButton();
  await accountOverviewPage.assertAccountOverviewIsVisible();
  await accountOverviewPage.clickOpenNewAccountLink();
  await openNewAccountPage.assertOpenNewAccountHeaderIsVisible();
  await openNewAccountPage.selectAccountType('SAVINGS');
  await openNewAccountPage.assertFromAccountIdIsNotEmpty();
  await openNewAccountPage.clickOpenNewAccountButton();
  await openNewAccountPage.assertAccountOpenedHeadingIsVisible();
  await openNewAccountPage.assertCongratulationsMessageContainsText(
    CONGRATULATIONS_ACCOUNT_OPEN_MESSAGE,
  );
});
