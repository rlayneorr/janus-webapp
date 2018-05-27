/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */

import { browser, by, element, ElementHelper } from 'protractor';
import { Util } from '../../e2e-util';

export class SettingsPage{

    util : Util = new Util();
    constructor(){
      this.util.addToBase('/#/');
    }

    navigateTo(){
        this.util.navigateTo('Caliber/home');
    }

    clickSettings(){

        this.util.get('//*[@id="settingsMenu"]','xpath','click');
    }
    
}