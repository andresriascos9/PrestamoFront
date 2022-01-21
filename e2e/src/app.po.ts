import { browser, by, element } from 'protractor';

export class AppPage {
  private h1 = element(by.css('app-root h1'));

  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }

  async getTitleText() {
    await this.h1.getText();
  }
}
