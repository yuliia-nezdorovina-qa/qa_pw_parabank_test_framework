import { test } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import {
  EMPTY_USERNAME_MESSAGE,
  EMPTY_PASSWORD_MESSAGE,
  EMPTY_USERNAME_AND_PASSWORD_MESSAGE,
} from '../../../../src/ui/constants/signInErrorMessages';

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
    username: '',
    password: user.password,
    title: 'empty username',
    message: EMPTY_USERNAME_MESSAGE,
  },
  {
    username: user.username,
    password: '',
    title: 'empty password',
    message: EMPTY_PASSWORD_MESSAGE,
  },
  {
    username: '',
    password: '',
    title: 'empty username and empty password',
    message: EMPTY_USERNAME_AND_PASSWORD_MESSAGE,
  },
];

testParameters.forEach(({ username, password, title, message }) => {
  test.describe('Sign in negative tests', () => {
    test(`Sign in with ${title}`, async ({ homePage, signInPage }) => {
      await allure.severity(`minor`);
      await homePage.open();
      await homePage.fillUsernameField(username);
      await homePage.fillPasswordField(password);
      await homePage.clickLogInButton();
      await signInPage.assertEmptyErrorMessageContainsText(message);
    });
  });
});
