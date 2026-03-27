import { test as base } from '@playwright/test';
import { Loginpage } from '../pages/LoginPage';

type myfixt = {
    mfixtur: Loginpage;
};

export const test=base.extend<myfixt>({
    mfixtur:  async({ page }, use) => {
        const lognpag=new Loginpage(page);
        await lognpag.navigateToUrl();
        await use(lognpag);
    },
    
})