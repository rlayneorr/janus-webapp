/**@author Dennis Park ❀ヅ❤♫| 1803-USF-MAR26 | Wezley Singleton */

import { browser, by, element } from 'protractor';



export class PanelPage {

  navigateTo() {
    browser.get(browser.baseUrl+'/#/Caliber/panel');
  }

  getCreatePanelButton() {
    return element(by.buttonText('Create Panel')).getText();
  }
  
}
