import { expect } from '@playwright/test';
import * as allure from 'allure-js-commons';
import { test } from '../../../_fixtures/fixtures';
import { registerUser } from '../../../../src/ui/actions/auth/registerUser';
import { generateNewUserData } from '../../../../src/common/testData/generateNewUserData';

test.beforeEach(async ({ page, user }) => {
  await registerUser(page, user);
});

test.describe('Update Contact Info with valid data', () => {
  test('User can successfully update profile with valid data', async ({
    updateContactInfoPage,
  }) => {
    await allure.severity(`normal`);
    const newData = generateNewUserData();

    await updateContactInfoPage.open();

    await updateContactInfoPage.fillFirstNameField(newData.username);
    await updateContactInfoPage.fillLastNameField(newData.username);
    await updateContactInfoPage.fillAddressField(newData.address);
    await updateContactInfoPage.fillCityField(newData.city);
    await updateContactInfoPage.fillStateField(newData.state);
    await updateContactInfoPage.fillZipCodeField(newData.zipCode);
    await updateContactInfoPage.fillPhoneField(newData.phone);

    await updateContactInfoPage.clickUpdateProfileButton();

    await updateContactInfoPage.assertProfileUpdatedHeadingIsVisible();

    await updateContactInfoPage.open();

    const savedFirstName = await updateContactInfoPage.getFirstNameValue();
    const savedLastName = await updateContactInfoPage.getLastNameValue();
    const savedAddress = await updateContactInfoPage.getAddressValue();
    const savedCity = await updateContactInfoPage.getCityValue();
    const savedState = await updateContactInfoPage.getStateValue();
    const savedZipCode = await updateContactInfoPage.getZipCodeValue();
    const savedPhone = await updateContactInfoPage.getPhoneValue();

    expect(savedFirstName).toBe(newData.username);
    expect(savedLastName).toBe(newData.username);
    expect(savedAddress).toBe(newData.address);
    expect(savedCity).toBe(newData.city);
    expect(savedState).toBe(newData.state);
    expect(savedZipCode).toBe(newData.zipCode);
    expect(savedPhone).toBe(newData.phone);
  });
});
