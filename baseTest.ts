import { Locator, type Page } from '@playwright/test';

export class BasePage {
    // We use 'protected' so that child classes (like LoginPage) 
    // can access this.page directly.
    protected readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async navUrl(url: string) {
        await this.page.goto(url);
        // Defaulting to 'load' state
        await this.page.waitForLoadState('load'); 
    }

    async clickEle(selectorqs: string) {
        await this.page.locator(selectorqs).click();
    }

    async waitForLoadState(state: 'load' | 'domcontentloaded' | 'networkidle' = 'load') {
        await this.page.waitForLoadState(state);
    }

    async takeScreenshot(fileName: string) {
        await this.page.screenshot({ path: `screenshots/${fileName}.png` });
    }
}