import { test } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';

test.beforeEach(async ({ pages, user }) => {
  await registerUser(pages[0], user);
});

test('Registered user can `Log In` flow test', async ({
  homePage,
  accountOverviewPage,
  user,
}) => {
  await allure.severity(`critical`);

  await homePage.open();
  await homePage.fillUsernameField(user.username);
  await homePage.fillPasswordField(user.password);
  await homePage.clickLogInButton();
  await accountOverviewPage.assertAccountOverviewIsVisible();
});
