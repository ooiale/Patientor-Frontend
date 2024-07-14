import { test, describe, expect } from '@playwright/test';

describe("Patientor", () => {
  test('front page loads', async ( { page } ) => {
    await page.goto('')
    await expect(page.getByRole('columnheader', { name: 'Name' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Gender' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Occupation' })).toBeVisible();
    await expect(page.getByRole('columnheader', { name: 'Health Rating' })).toBeVisible();
  }),

  test('can navigate to patient page', async ( { page } ) => {
    await page.goto('')
    await page.getByRole('link', { name: 'John McClane' }).click();
    await expect(page.getByRole('heading', { name: 'John McClane' })).toBeVisible();
  }),

  test('can add new patient', async ( { page } ) => {
    await page.goto('')
    await page.getByRole('button', { name: 'Add New Patient' }).click();
    await expect(page.getByRole('heading', { name: 'Add a new patient' })).toBeVisible();
  })

})
