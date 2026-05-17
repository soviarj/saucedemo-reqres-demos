import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/loginPage';
import { InventoryPage } from '../pages/inventoryPage';
import { ApiClients } from './apiClient';
export {expect} from '@playwright/test';

type Fixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    apiClient: ApiClients;
    variables: {
        response?: any;
        responseBody?: any;
    };
}

export const test = base.extend<Fixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },

    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },

    apiClient: async ({ request }, use) => {
        await use(new ApiClients(request));
    }, 

    variables: async ({ }, use) => {
        await use({});
    }
});