import { test as base, type APIRequestContext } from '@playwright/test';
import { config } from '../config/env';

type SignInFixture = {
  signedInRequest: APIRequestContext;
};

export const test = base.extend<SignInFixture>({
  signedInRequest: async ({ request }, use) => {
    await request.post('/api/auth/signin', {
      data: {
        email: config.user.email,
        password: config.user.password,
        remember: false,
      },
    });

    await use(request);
  },
});
