import { RegistrationPage } from '../../pages/auth/RegistrationPage';
import { HomePage } from '../../pages/auth/HomePage';
import { testStep } from '../../../common/helpers/pwHelpers';
import { ACCOUNT_SUCCESS_MESSAGE } from '../../constants/registrationSuccessMessages';

export async function registerUser(page, user, userId = 0) {
  await testStep(
    `Register user`,
    async () => {
      const registrationPage = new RegistrationPage(page, userId);
      const homePage = new HomePage(page, userId);

      await registrationPage.open();
      await registrationPage.submitRegistrationForm(user);

      await homePage.assertSuccessMessageContainsText(ACCOUNT_SUCCESS_MESSAGE);
      await homePage.assertUserNameIsVisible(user.username);
    },
    userId,
  );
}
