import { test } from '../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../src/ui/actions/auth/registerUser';

test.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});

test.describe('Log Out', () => {
  test('User can successfully log out', async ({ homePage, signInPage }) => {
    await allure.severity(`normal`);
    await homePage.clickLogOutLink();

    await signInPage.assertLoginFormIsVisible();
  });
});
