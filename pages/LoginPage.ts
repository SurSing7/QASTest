import type { Locator, Page } from "@playwright/test";
import { expect } from "@playwright/test";

export class Loginpage{
    private readonly page:Page;
    private readonly firstName:Locator;
    private readonly lastName:Locator;
     private readonly email:Locator;
    private readonly username:Locator;
    private readonly password:Locator;
    private readonly passwordConfirm:Locator;
    private readonly checkBoxPolicy:Locator;
    private readonly checkBoxConsent:Locator;

    constructor(page:Page){

        this.page=page;
        this.firstName=page.getByPlaceholder('Enter your first name');
        this.lastName=page.getByPlaceholder('Enter your last name');
        this.email=page.locator('//input[@name="emailAddress"]');
        this.username=page.getByText(/username/i);
        this.password=page.getByTestId('password-input-Password');
        this.passwordConfirm=page.getByTestId('password-input-Password Confirmation');
        this.checkBoxPolicy=page.getByTestId('consentedToTerms');
        this.checkBoxConsent=page.getByRole('checkbox', { name: /By checking the applicable/i })
    }

    async navigateToUrl(){
        await this.page.goto(process.env.BASE_URL!);
        await this.page.waitForLoadState('domcontentloaded');
    }

    async loginPage(){
        let email='sureshid75@gmail.com';
        await expect(this.firstName).toBeVisible();
        await this.firstName.fill('Suresh');
        await this.lastName.fill('Singh');
        await this.username.fill('ssingh79');
        await this.email.click();
        await this.email.pressSequentially(email);
        await this.password.fill('qaZ123zxcvb#');
        await this.passwordConfirm.fill('qa123zxcvb#');
        await this.checkBoxPolicy.check();
        await this.checkBoxConsent.check();
        const btn= await this.page.getByTestId('button-default').first();
        // await this.page.locator('#id2', { hasNotText: 'adasd' })
    //   await btn.focus()
      await btn.click();
        console.log('all done')
    }

}