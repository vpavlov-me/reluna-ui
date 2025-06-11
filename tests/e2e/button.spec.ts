import { test, expect } from '@playwright/test'

test.describe('Button Component', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/iframe.html?id=components-button--default')
  })

  test('should render button correctly', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Button' })
    await expect(button).toBeVisible()
  })

  test('should handle click events', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Button' })
    await button.click()
    // Add assertions based on expected behavior
  })

  test('should be keyboard accessible', async ({ page }) => {
    await page.keyboard.press('Tab')
    const button = page.getByRole('button', { name: 'Button' })
    await expect(button).toBeFocused()
    
    await page.keyboard.press('Enter')
    // Add assertions for keyboard interaction
  })

  test('should have proper focus indicators', async ({ page }) => {
    const button = page.getByRole('button', { name: 'Button' })
    await button.focus()
    
    // Check for focus ring
    const focusRing = await button.evaluate((el) => {
      const styles = window.getComputedStyle(el)
      return styles.outline || styles.boxShadow
    })
    
    expect(focusRing).toBeTruthy()
  })
}) 