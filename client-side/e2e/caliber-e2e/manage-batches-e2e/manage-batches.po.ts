/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */
/**@author Bryce Charydczak | 1803-USF-MAR26 | Wezley Singleton */

import { browser, by, element, ElementHelper } from 'protractor';


export class AppPage {


  navigateTo() {
    browser.get(browser.baseUrl + '/#/Caliber/manage');
  }

  clickManageBatches() {
    const e = element(by.linkText('Manage Batch'));
    e.click();
  }

  clickCreateBatch() {
    const e = element(by.buttonText('Create Batch'));
    e.click();
  }

  clickUpdate() {
    const e = element(by.buttonText('Update'));
    e.click();
  }

  clickExit() {
    const e = element(by.css('.close'));
    e.click();
  }

  clickImport() {
    const e = element(by.buttonText('Import Batch'));
    e.click();
  }

  getModal() {
    return element(by.css('.modal-content'));
  }
}
