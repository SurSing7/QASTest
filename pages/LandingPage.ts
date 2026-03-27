import { BasePage } from '../baseTest.ts';
import { type Page } from '@playwright/test';

export class LandingPage extends BasePage {
    constructor(page: Page) {
        super(page); 
    }

    async fullLoginFlow(url: string) {
        await this.navUrl(url); 
        await this.page.fill('#user', 'tester'); // You still have access to this.page
        await this.clickEle('#login-button');
    }
}