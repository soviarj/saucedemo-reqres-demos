import { Locator, Page } from "@playwright/test";
import { commonPassword, sauceDemoUrl } from "../helpers/constants";

export class LoginPage {

    readonly page: Page
    readonly usernameInput: Locator
    readonly passwordInput: Locator
    readonly loginButton: Locator

    constructor(page: Page) {
        this.page = page;
        this.usernameInput = page.locator('#user-name');
        this.passwordInput = page.locator('#password');
        this.loginButton = page.locator('#login-button');
    }

    async login(username: string) {
        await this.page.goto(sauceDemoUrl);
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(commonPassword);
        await this.loginButton.click();   
    }
}
