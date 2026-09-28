import { test } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { USERNAME_OR_PASSWORD_MESSAGE } from '../../../../src/ui/constants/signInErrorMessages';

import { registerUser } from '../../../../src/ui/actions/auth/registerUser';
import { generateNewUserData } from '../../../../src/common/testData/generateNewUserData';

const user = generateNewUserData();

test.beforeAll(async ({ browser }) => {
  const context = await browser.newContext();
  const page = await context.newPage();

  await registerUser(page, user);

  await context.close();
});

const testParameters = [
  {
    username: `wrong_${user.username}`,
    password: user.password,
    title: 'wrong Username',
    message: USERNAME_OR_PASSWORD_MESSAGE,
  },
  {
    username: user.username,
    password: `wrong_${user.password}`,
    title: 'wrong Password',
    message: USERNAME_OR_PASSWORD_MESSAGE,
  },
  {
    username: `wrong_${user.username}`,
    password: `wrong_${user.password}`,
    title: 'wrong username and wrong password',
    message: USERNAME_OR_PASSWORD_MESSAGE,
  },
];

testParameters.forEach(({ username, password, title, message }) => {
  test.describe('Sign in with not valid data', () => {
    test(`Sign in with ${title}`, async ({ homePage, signInPage }) => {
      await allure.severity(`minor`);

      await homePage.open();
      await homePage.fillUsernameField(username);
      await homePage.fillPasswordField(password);
      await homePage.clickLogInButton();
      await signInPage.assertNotVerifiedErrorMessageContainsText(message);
    });
  });
});
