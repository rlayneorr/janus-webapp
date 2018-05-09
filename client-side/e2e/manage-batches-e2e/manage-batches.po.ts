import { browser, by, element } from 'protractor';

export class AppPage {
  navigateTo() {
    return browser.get('/');
  }

  getTitleText() {
    return element(by.css('app-root h2')).getText();
  }

  getAssignForceTitleText() {
    return element(by.xpath('/html/body/div/app-root/app-janus/app-dashboard/div[2]/div[1]/div[1]/h1')).getText();
  }

  getCaliberTitleText() {
    return element(by.xpath('/html/body/div/app-root/app-janus/app-dashboard/div[2]/div[2]/div[1]/h1')).getText();
  }

  getTrackForceTitleText() {
    return element(by.xpath('/html/body/div/app-root/app-janus/app-dashboard/div[2]/div[3]/div[1]/h1')).getText();
  }

  clickTrackForceButton() {
    const e = element(by.xpath('/html/body/div/app-root/app-janus/app-dashboard/div[2]/div[3]/div[2]/img'));
    e.click();
  }

  getTrackForceLoginTitleText() {
    return element(by.id('loginHeaderTrackForce')).getText();
  }

  sendTrackForceLogin() {
    const username = element(by.id('username'));
    username.sendKeys('TestAdmin');
    const password = element(by.id('password'));
    password.sendKeys('TestAdmin');
    const submitButton = element(by.xpath('//*[@id="pwd-container"]/div[2]/section/form/button'));
    submitButton.click();
  }

  getTrackForceLoggedInTitleText() {
    return element(by.className('title')).getText();
  }

  goToClientListPage() {
    element(by.id('smallWindowNav')).click();
    const e = element(by.id('clientListNav'));
    e.click();
  }

  getClientListTitleText() {
    return element(by.id('clientTitle')).getText();
  }

  clickFirstClient() {
    element(by.xpath('//*[@id="clients-list"]/li[1]/span')).click();
  }

  clickCharts() {
    browser.actions().
    mouseMove(element(by.tagName('canvas')[2])).
    mouseMove({x: 200, y: 100}).
    doubleClick().
    perform();
    browser.pause();
  }

  getFirstClientListName() {
    return element(by.xpath('//*[@id="clients-list"]/li[1]/span')).getText();
  }

  getClientListChartTitle() {
    return element(by.xpath('/html/body/div/app-root/app-janus/app-client-list/div/div[2]/div[2]/h1')).getText();
  }

  searchClientList(clientName) {
    element(by.id('clientSearch')).sendKeys(clientName);
    element(by.xpath('//*[@id="clients-list"]/li/span')).click();
  }

  clickClientListSearchResult() {
    element(by.xpath('//*[@id="clients-list"]/li/span')).click();
  }

  goToBatchListPage() {
    element(by.id('smallWindowNav')).click();
    element(by.xpath('//*[@id="batchListNav"]')).click();
  }

  getBatchListTitleText() {
    return element(by.xpath('/html/body/div/app-root/app-janus/app-batch-list/div/div/div[2]/div[1]/h3')).getText();
  }

  goToAssociateList() {
    element(by.id('smallWindowNav')).click();
    element(by.id('associateListNav')).click();
  }

  /*getNumberOfClients() : Promise<number> {
    return new Promise<number>((resolve) => {
      let data = element.all(by.xpath('//*[@id="clients-list"]/li')).count();
      resolve(data);
    });

  }*/

  getClientNameAtIndex(index) {
    const indexString = '//*[@id="clients-list"]/li[' + index + ']/span';
    return element(by.xpath(indexString)).getText();
  }

  clickClientAtIndex(index) {
    const indexString = '//*[@id="clients-list"]/li[' + index + ']/span';
    return element(by.xpath(indexString)).click();

  }

  getAssociatePageTitle() {
    return element(by.xpath('/html/body/div/app-root/app-janus/app-associate-list/div/h3')).getText();
  }

  goToPredictionsPage() {
    element(by.id('smallWindowNav')).click();
    element(by.id('predictionsNav')).click();
  }

  getPredictionsPageTitle() {
    return element(by.xpath('/html/body/div/app-root/app-janus/app-predictions/div/div/div[1]/h3')).getText();
  }

}
