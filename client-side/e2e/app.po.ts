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
    let e = element(by.xpath('/html/body/div/app-root/app-janus/app-dashboard/div[2]/div[3]/div[2]/img'));
    e.click();
  }

  getTrackForceLoginTitleText() {
        return element(by.id('loginHeaderTrackForce')).getText();
  }

  sendTrackForceLogin(){
    let username = element(by.id('username'));
    username.sendKeys('TestAdmin');
    let password = element(by.id('password'));
    password.sendKeys('TestAdmin');
    let submitButton = element(by.xpath('//*[@id="pwd-container"]/div[2]/section/form/button'));
    submitButton.click();
  }

  getTrackForceLoggedInTitleText() {
    return element(by.className('title')).getText();
  }

  goToClientListPage() {
    if(element(by.id('smallWindowNav')).isDisplayed()){
      element(by.id('smallWindowNav')).click();
      let e = element(by.xpath('//*[@id="clientListNav"]'));
      e.click();
    }else{
      let e = element(by.id('clientListNav'));
      e.click();
    }
  }

  getClientListTitleText() {
    return element(by.id('clientTitle')).getText();
  }
  
}
