import { browser, by, element, ElementHelper } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root h2')).getText();
  }

  getCaliberTitleText() {
    return element(by.xpath('/html/body/div/app-root/app-janus/app-dashboard/div[2]/div[2]/div[1]/h1')).getText();
  }

  clickCaliberButton() {
    const e = element(by.xpath('/html/body/div/app-root/app-janus/app-dashboard/div[2]/div[2]/img'));
    e.click();
  }

  clickManageBatches() {
    // ensure that the navbar is visible by maximizing the browser
    browser.driver.manage().window().maximize();
    const e = element(by.css('body > div > app-root > app-janus > app-nav > nav >' +
    'div.collapse.navbar-collapse > div > app-caliber-nav > ul > li:nth-child(2) > a'));
    e.click();
  }
}
