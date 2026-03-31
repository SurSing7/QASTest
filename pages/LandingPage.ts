import { Page, Locator } from '@playwright/test';
 
 
export class LandingPage  {
  // Login form elements
  private readonly page:Page;
  readonly usernameInput: Locator;
  private readonly passwordInput: Locator;
  private readonly loginButton: Locator;
 
  constructor(page: Page) {
    this.page=page;
    this.usernameInput = page.getByTestId('usernameOrEmail');
    this.passwordInput = page.getByTestId('password');
    this.loginButton = page.getByRole('button', { name: 'Login' });
  }
 
  async navigate() {
    await this.page.goto(process.env.BASE_URL!);
  }
 
  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginButton.click();
    // Wait for navigation to complete after login
    await this.page.waitForLoadState();
  }
 
  async isLoginButtonVisible(): Promise<boolean> {
    return await this.loginButton.isVisible();
  }
}