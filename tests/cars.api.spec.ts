import { expect } from '@playwright/test';
import { test } from '../fixtures/signIn';

test('Authenticated user can create a car', async ({ signedInRequest }) => {
  const response = await signedInRequest.post('/api/cars', {
    data: { carBrandId: 1, carModelId: 1, mileage: 100 },
  });
  const body = await response.json();
  await signedInRequest.delete(`/api/cars/${body.data.id}`);

  expect(response.status()).toBe(201);
  expect(body.data.brand).toBe('Audi');
  expect(body.data.model).toBe('TT');
  expect(body.data.mileage).toBe(100);
});

test('User cannot create a car with not existing brand', async ({ signedInRequest }) => {
  const response = await signedInRequest.post('/api/cars', {
    data: { carBrandId: 999, carModelId: 1, mileage: 100 },
  });
  const body = await response.json();

  expect(response.status()).toBe(404);
  expect(body.message).toBe('Brand not found');
});

test('Unauthenticated user cannot create a car', async ({ request }) => {
  const response = await request.post('/api/cars', {
    data: { carBrandId: 1, carModelId: 1, mileage: 100 },
  });
  const body = await response.json();

  expect(response.status()).toBe(401);
  expect(body.message).toBe('Not authenticated');
});
