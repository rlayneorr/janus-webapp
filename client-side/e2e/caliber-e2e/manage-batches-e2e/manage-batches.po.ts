/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */

import { browser, by, element, ElementHelper } from 'protractor';


export class AppPage {


  navigateTo() {
    browser.get(browser.baseUrl+'/#/Caliber/manage');
  }

  clickManageBatches() {
    let e = element(by.linkText('Manage Batch'));
      e.click();
  }

  clickCreateBatch(){
    let e = element(by.buttonText('Create Batch'));
    e.click();
  }

  clickUpdate(){
    let e = element(by.buttonText('Update'));
    e.click();
  }

  clickExit(){
    let e = element(by.css('.close'));
    e.click();
  }

  clickImport(){
    let e = element(by.buttonText('Import Batch'));
    e.click();
  }

  getModal(){
    return element(by.css('.modal-content'));
  }



}
