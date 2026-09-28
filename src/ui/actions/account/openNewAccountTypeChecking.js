import { testStep } from '../../../common/helpers/pwHelpers';
import { AccountOverviewPage } from '../../pages/auth/AccountOverviewPage';
import { OpenNewAccountPage } from '../../pages/auth/OpenNewAccountPage';
import { CONGRATULATIONS_ACCOUNT_OPEN_MESSAGE } from '../../constants/accountMessages';

export async function openNewAccountTypeChecking(page) {
  return await testStep(`Open New account "CHECKING"`, async () => {
    const accountOverviewPage = new AccountOverviewPage(page);
    const openNewAccountPage = new OpenNewAccountPage(page);

    const accountType = 'CHECKING';
    await accountOverviewPage.clickOpenNewAccountLink();
    await openNewAccountPage.assertOpenNewAccountHeaderIsVisible();
    await openNewAccountPage.selectAccountType(accountType);
    await openNewAccountPage.selectFirstFromAccount();
    await openNewAccountPage.clickOpenNewAccountButton();
    await openNewAccountPage.assertCongratulationsMessageContainsText(
      CONGRATULATIONS_ACCOUNT_OPEN_MESSAGE,
    );
    const newAccountId = await openNewAccountPage.getNewAccountId();
    console.log(newAccountId);
    return newAccountId;
  });
}
