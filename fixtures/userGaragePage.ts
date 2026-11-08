import { test as base } from '@playwright/test';
import { config } from '../config/env';
import { HomePage } from '../pages/HomePage';
import { LoginModal } from '../pages/LoginModal';
import { GaragePage } from '../pages/GaragePage';

type UserGaragePageFixture = {
  userGaragePage: GaragePage;
};

export const test = base.extend<UserGaragePageFixture>({
  userGaragePage: async ({ page }, use) => {
    const homePage = new HomePage(page);
    const loginModal = new LoginModal(page);
    const garagePage = new GaragePage(page);

    await homePage.open();
    await homePage.openLoginModal();
    await loginModal.login(config.user.email, config.user.password);
    await page.waitForURL(/panel\/garage/);

    await use(garagePage);
  },
});
