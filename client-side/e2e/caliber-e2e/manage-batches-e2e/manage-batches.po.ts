/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */

import { browser, by, element, ElementHelper } from 'protractor';
import { Util } from '../../e2e-util';

export class AppPage {
  util : Util;

  constructor(){
   this.util = new Util();
   this.util.addToBase("/#/");
  }

  navigateTo() {
    return this.util.navigateTo('Caliber/manage');
  }

  clickManageBatches() {
    this.util.get('Manage Batch','linkText','click');
  }

  clickCreateBatch(){
    this.util.get('Create Batch','buttonText','click');
  }

  clickUpdate(){
    this.util.get('Update','buttonText','click');
  }

  clickExit(){
    this.util.get('.close','css','click');
  }

  clickImport(){

    this.util.get('Import Batch','buttonText','click');
  }



}
