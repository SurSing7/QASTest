import { expect, type Locator, type Page } from "@playwright/test";

export class HomePage {

    private readonly page: Page;
    private readonly btnAdjustCommision: Locator;
     readonly labelTotalCommision: Locator;
    private readonly valueTotalCommision: Locator;
    private readonly rowElemts: Locator;
    private readonly valTotalCommion: Locator;

    constructor(page: Page) {

        this.page = page;
        this.btnAdjustCommision = page.getByTestId('adjust-commission-splits');
        this.labelTotalCommision = page.getByText('TOTAL COMMISSION');
        this.valueTotalCommision = page.locator('//p[text()="TOTAL COMMISSION"]/..//div');
        this.rowElemts = page.locator('//p[text()="TOTAL COMMISSION"]/../..//section')
        .or(page.getByRole('heading', {name:/total/i})).first();
        this.valTotalCommion = page.locator('//span[@class="text-primary-dark"]');
    }

    async openSidebar() {
        await this.page.waitForLoadState('domcontentloaded');
        await this.btnAdjustCommision.click();
    }

    async rowElemnts() {
        await this.page.waitForLoadState();
        const listEle = await this.rowElemts.all();
        const arrEle = [];
        for (let i = 0; i < listEle.length; i++) {
            const rowEle = this.page.getByTestId(/commissionParticipant/).nth(i);
            arrEle.push(rowEle);
        }
        return arrEle;
    }

    async populateCommision(valCommission: string) {
        await this.page.waitForLoadState();
        const elets = await this.rowElemnts();

        for (let i = 0; i < elets.length; i++) {
            await elets[i].fill(valCommission);
        }
    }

    async verifyTotalCommision(val: string) {
        await this.page.waitForLoadState();
        const elets = await this.rowElemnts();

        for (let i = 0; i < elets.length; i++) {
            await expect(elets[i]).toHaveText(val)
        }
    }

    async verifyTotalCommissions() {
        await this.page.waitForLoadState();
        const valCommisonTotal = await this.valTotalCommion.innerText();
        await expect(this.valueTotalCommision).toContainText(valCommisonTotal);
    }

    async varifyMinParticipant(max:number) {
        try {
            for (let i = 0; i < max; i++) {
                expect(this.page.getByTestId(/commissionParticipant/).nth(i)).toBeVisible()
            }
        }
        catch (e) {
            throw new Error('Failed to found min 2 paricipant');
        }
    }
}