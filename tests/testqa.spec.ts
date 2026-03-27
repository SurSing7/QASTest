import { test } from '../fixtures/fixture.ts';
import { Loginpage } from '../pages/LoginPage';
import { readFileSync } from 'fs';
import { PaymentsPage, userType } from '../pages/paymentpage.ts';

const dataJs=JSON.parse(readFileSync(new URL('../testdata/testingData.json',
   import.meta.url), 'utf-8'));

test.skip('Login Form Test', async ({ mfixtur }) => {
  // Login to app
    // const loginpage=new Loginpage(loginpages);
    await mfixtur.navigateToUrl();
    await mfixtur.loginPage();
    console.log('Test completed')
});

test('second', async ({ page }) => {
  const payPage=new PaymentsPage(page);
  const list= await payPage.excelData<userType>();
  for(const row of list){
  console.log('dat is=',row);
  await payPage.populateField(row.user, row.Pass);
  }

});

