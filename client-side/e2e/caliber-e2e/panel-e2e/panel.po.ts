/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */

import { browser, by, element } from 'protractor';
import { Util } from '../../e2e-util';


export class PanelPage {

    util : Util = new Util();
    constructor(){
      this.util.addToBase('/#/');
    }

  navigateTo() {
  this.util.navigateTo('Caliber/panel');
  }

  getCreatePanelButton() {
    return this.util.get('Create Panel', 'buttonText', 'text');
  }
}
