import { test } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';

const LOAN_AMOUNT = '30';
const DOWN_PAYMENT = '20';

test.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});

test.describe('Request Loan with valid data', () => {
  test('User can successfully request a loan for a new account', async ({
    homePage,
    accountOverviewPage,
    requestLoanPage,
    openNewAccountTypeSavings,
  }) => {
    await allure.severity(`critical`);
    const newAccountId = openNewAccountTypeSavings;

    await homePage.clickAccountsOverviewLink();
    await accountOverviewPage.assertAccountIsVisible(newAccountId);

    await requestLoanPage.open();
    await requestLoanPage.fillLoanAmountField(LOAN_AMOUNT);
    await requestLoanPage.fillDownPaymentField(DOWN_PAYMENT);
    await requestLoanPage.selectFromAccount(newAccountId);
    await requestLoanPage.clickApplyNowButton();

    await requestLoanPage.assertLoanRequestProcessedHeadingIsVisible();
    await requestLoanPage.assertStatusApprovedIsVisible();
  });
});
