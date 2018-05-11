import { browser, by, element } from 'protractor';

export class PanelPage {
  navigateTo() {
    return browser.get('http://ec2-35-182-210-106.ca-central-1.compute.amazonaws.com/#/Caliber/panel');
  }

  getCreatePanelButton() {
    return element(by.buttonText('Create Panel')).getText();
  }
}
