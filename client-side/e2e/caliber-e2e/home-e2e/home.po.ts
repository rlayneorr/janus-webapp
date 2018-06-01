/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */
/**@author Bryce Charydczak | 1803-USF-MAR26 | Wezley Singleton */

import { browser, by, element } from 'protractor';
import { Util } from '../../e2e-util';

export class HomePage {

  util: Util;
  constructor() {
   this.util = new Util();
  }

  navigateTo() {
   browser.get(browser.baseUrl + '/');
  }

getTitleText() {

  return element(by.css('app-root h2')).getText();
  }

  getCaliberTitleText() {

    return element(by.xpath('//h1[text()="Caliber"]')).getText();
  }

  clickCaliberButton() {
    const e = element(by.css('img[src="../assets/caliber.png"]'));
    e.click();
  }

}
