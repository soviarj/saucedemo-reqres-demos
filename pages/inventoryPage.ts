import { expect, Page } from "@playwright/test";
import { InventoryLocators } from "./inventoryPageLocators";

export class InventoryPage {
    constructor(private page: Page) {}

    get productItems() {
        return this.page.locator('.inventory_item');
    }

    async addToCartButtons() {
        await this.page.locator(InventoryLocators.productItems)
            .first().locator(InventoryLocators.addToCartButton).click();
    }

    async proceedToCheckout() {
        await this.page.locator(InventoryLocators.productItems)
            .first().locator(InventoryLocators.addToCartButton).click();
        await this.page.locator(InventoryLocators.shoppingCartLink).click();
        await this.page.locator(InventoryLocators.checkoutButton).click();
    }

    async fillCheckoutInformation(firstName: string, lastName: string, postalCode: string) {
        await this.page.locator(InventoryLocators.firstNameInput).fill(firstName);
        await this.page.locator(InventoryLocators.lastNameInput).fill(lastName);
        await this.page.locator(InventoryLocators.postalCodeInput).fill(postalCode);
        await this.page.locator(InventoryLocators.continueButton).click();
    }

    async finishCheckout() {
        await this.page.locator(InventoryLocators.finishButton).click();
    }

    async logout() {
        await this.page.locator(InventoryLocators.burgerMenuButton).click();
        await this.page.locator(InventoryLocators.logoutSidebarLink).click();
    }

    async sortProductsBy(criteria: string) {
        await this.page.selectOption((InventoryLocators.sortProducts), criteria);
    }

    async expectPricesSorted(order: 'lohi' | 'hilo') {
        const prices = await this.page
            .locator(InventoryLocators.inventoryItemPrice)
            .allTextContents();

        const numericPrices = prices.map(p =>
            parseFloat(p.replace('$', '').trim())
        );

        for (let i = 1; i < numericPrices.length; i++) {
            if (order === 'lohi') {
            expect.soft(numericPrices[i - 1]).toBeLessThanOrEqual(numericPrices[i]);
            } else {
            expect.soft(numericPrices[i - 1]).toBeGreaterThanOrEqual(numericPrices[i]);
            }
        }
    }

    async expectNamesSorted(order: 'az' | 'za') {
        const names = await this.page
            .locator(InventoryLocators.inventoryItemName)
            .allTextContents();

        const normalizedNames = names.map(n => n.trim().toLowerCase());

        const comparator =
            order === 'az'
            ? (a: string, b: string) => a.localeCompare(b) <= 0
            : (a: string, b: string) => a.localeCompare(b) >= 0;

        for (let i = 1; i < normalizedNames.length; i++) {
            expect.soft(
            comparator(normalizedNames[i - 1], normalizedNames[i])
            ).toBeTruthy();
        }
    }
}