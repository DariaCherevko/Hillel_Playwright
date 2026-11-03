import { expect } from '@playwright/test';
import { test } from '../fixtures/userGaragePage';

test('Logged in user redirects to the garage page', async ({ userGaragePage }) => {
  await expect(userGaragePage.title).toBeVisible();
  await expect(userGaragePage.addCarButton).toBeVisible();
});
