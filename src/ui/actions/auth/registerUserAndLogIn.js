import { RegistrationPage } from '../../pages/auth/RegistrationPage';
import { HomePage } from '../../pages/auth/HomePage';
import { testStep } from '../../../common/helpers/pwHelpers';
import { ACCOUNT_SUCCESS_MESSAGE } from '../../constants/registrationSuccessMessages';
import { SignInPage } from '../../pages/auth/SignInPage';
import { AccountOverviewPage } from '../../pages/auth/AccountOverviewPage';

export async function registerUserAndLogIn(page, user, userId = 0) {
  await testStep(
    `Register user and log in`,
    async () => {
      const registrationPage = new RegistrationPage(page, userId);
      const homePage = new HomePage(page, userId);
      const signInPage = new SignInPage(page, userId);
      const accountOverviewPage = new AccountOverviewPage(page, userId);

      await registrationPage.open();
      await registrationPage.submitRegistrationForm(user);

      await homePage.assertSuccessMessageContainsText(ACCOUNT_SUCCESS_MESSAGE);
      await homePage.assertUserNameIsVisible(user.username);
      await registrationPage.clickLogOutButton();
      await homePage.assertCustomerLoginHeadingIsVisible();
      await signInPage.submitLogInForm(user);
      await accountOverviewPage.assertAccountOverviewIsVisible();
    },
    userId,
  );
}
