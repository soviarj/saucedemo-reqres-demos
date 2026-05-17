
import { users } from '../data/fe-eshop-users';
import { test, expect } from '../helpers/fixtures';
import { InventoryLocators } from '../pages/inventoryPageLocators';

for (const user of Object.values(users)) {
  test.describe(`E-Shop test flow with user @${user.username} @frontEndTests @allTests`, () => {

    test.beforeEach(async ({ loginPage, page }) => {
      await loginPage.login(user.username);
      await expect(page.locator(InventoryLocators.appLogo)).toBeVisible({ timeout: 500 });
    });

    test.afterEach(async ({ loginPage, inventoryPage, page }) => {
      if (await page.locator(InventoryLocators.burgerMenuButton).isVisible().catch(() => false)) {
          await inventoryPage.logout();
      }
        await expect(loginPage.loginButton).toBeVisible();
    });

      test('should display products @displayProducts', async ({ page }) => {
        await expect(page.locator(InventoryLocators.productItems)).toHaveCount(6);
      });

      test('should add a product to the cart @addToCart', async ({ page, inventoryPage }) => {
        await inventoryPage.addToCartButtons();
        await expect(page.locator(InventoryLocators.cartBadge)).toHaveText('1');
      });

      test('should complete the checkout process @checkout', async ({ page, inventoryPage }) => {
        await test.step('Add product to cart and proceed to checkout', async () => {
          await inventoryPage.proceedToCheckout();
        });

        await test.step('Fill in checkout information', async () => {
          await inventoryPage.fillCheckoutInformation(
            user.firstName, 
            user.lastName, 
            user.zipCode);
        });

        await test.step('Finish checkout and verify confirmation', async () => {
          await inventoryPage.finishCheckout();
        await expect(page.locator(InventoryLocators.confirmationMessage))
          .toHaveText('Thank you for your order!');
        });

        await test.step('Navigate back to products and verify', async () => {
          const start = performance.now();
          await page.locator(InventoryLocators.backToProductsButton).click();
          const duration = performance.now() - start;
          await expect(page.locator(InventoryLocators.title))
            .toHaveText('Products');
          expect(duration).toBeLessThan(2500);
        });
      });

      test('list products @listing', async ({ inventoryPage }) => {
        await test.step('Sort products from low to high and verify', async () => {
          await inventoryPage.sortProductsBy('lohi');
          await inventoryPage.expectPricesSorted('lohi');
        });

        await test.step('Sort products from high to low and verify', async () => {
          await inventoryPage.sortProductsBy('hilo');
          await inventoryPage.expectPricesSorted('hilo');
        });

        await test.step('Sort products from A to Z and verify', async () => {
          await inventoryPage.sortProductsBy('az');
          await inventoryPage.expectNamesSorted('az');
        });

        await test.step('Sort products from Z to A and verify', async () => {
          await inventoryPage.sortProductsBy('za');
          await inventoryPage.expectNamesSorted('za');
        }); 
      });
  });
}
