/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */

import { browser, by, element } from 'protractor';
import { Util } from '../../e2e-util';

export class HomePage {

  util : Util;
  constructor(){
   this.util = new Util();
  }

  navigateTo() {
    return this.util.navigateTo('/');
  }

getTitleText() {
   return this.util.get('app-root h2','css','text');
  }

  getCaliberTitleText() {
    let xpath = '/html/body/div/app-root/app-janus/app-dashboard/div[2]/div[2]/div[1]/h1';
    return this.util.get(xpath,'xpath','text');
  }

  clickCaliberButton() {
    let xpath = '/html/body/div/app-root/app-janus/app-dashboard/div[2]/div[2]/div[1]/h1';
    return this.util.get(xpath,'xpath','click');
  }

}