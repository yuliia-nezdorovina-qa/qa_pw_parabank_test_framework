import { test as base } from '@playwright/test';
import { RegistrationPage } from '../../src/ui/pages/auth/RegistrationPage';
import { HomePage } from '../../src/ui/pages/auth/HomePage';
import { registerUser } from '../../src/ui/actions/auth/registerUser';
import { SignInPage } from '../../src/ui/pages/auth/SignInPage';
import { ForgotLoginInfoPage } from '../../src/ui/pages/auth/ForgotLoginInfoPage';
import { UpdateContactInfoPage } from '../../src/ui/pages/auth/UpdateContactInfoPage';

export const test = base.extend<{
  registerUser;
  registrationPage;
  signInPage;
  homePage;
  forgotLoginInfoPage;
}>({
  registrationPage: async ({ page }, use) => {
    const registrationPage = new RegistrationPage(page);

    await use(registrationPage);
  },
  homePage: async ({ page }, use) => {
    const homePage = new HomePage(page);

    await use(homePage);
  },
  signInPage: async ({ page }, use) => {
    const signInPage = new SignInPage(page);

    await use(signInPage);
  },
  updateContactInfoPage: async ({ page }, use) => {
    const updateContactInfoPage = new UpdateContactInfoPage(page);

    await use(updateContactInfoPage);
  },
  forgotLoginInfoPage: async ({ page }, use) => {
    const forgotLoginInfoPage = new ForgotLoginInfoPage(page);

    await use(forgotLoginInfoPage);
  },
  registerUser: async ({ page, user }, use) => {
    await registerUser(page, user);
    await use(user);
  },
});
