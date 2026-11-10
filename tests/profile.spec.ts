import { expect } from '@playwright/test';
import { test } from '../fixtures/userGaragePage';
import { ProfilePage } from '../pages/ProfilePage';

const mockedProfile = {
  status: 'ok',
  data: {
    userId: 101,
    photoFilename: 'default-user.png',
    name: 'Mocked',
    lastName: 'User',
    dateBirth: '1998-10-01T00:00:00.000Z',
    country: 'Ukraine'
  },
};

test('Profile page shows data from mocked response', async ({ userGaragePage }) => {
  const page = userGaragePage.page;
  const profilePage = new ProfilePage(page);

  await page.route('**/api/users/profile', async (route) => {
    await route.fulfill({ status: 200, json: mockedProfile });
  });

  await profilePage.open();

  await expect(profilePage.title).toBeVisible();
  await expect(profilePage.userName).toHaveText(
    `${mockedProfile.data.name} ${mockedProfile.data.lastName}`
  );
});
