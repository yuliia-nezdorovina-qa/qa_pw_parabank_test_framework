import { test } from '../../../_fixtures/fixtures';
import * as allure from 'allure-js-commons';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';

test.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});

test.describe('Request Loan with empty fields', () => {
  test('User sees error when applying for loan with empty fields', async ({
    requestLoanPage,
  }) => {
    await allure.severity(`minor`);
    await requestLoanPage.open();
    await requestLoanPage.clickApplyNowButton();
    await requestLoanPage.assertErrorHeadingIsVisible();
  });
});
