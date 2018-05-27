
import { browser, by, element, ElementHelper } from 'protractor';
import { Util } from '../../e2e-util';

export class AssessPage{

    util : Util;

    constructor(){
     this.util = new Util();
     this.util.addToBase("/#/");
    }
  
    navigateTo() {
      return this.util.navigateTo('Caliber/assess');
    }

    clickCreateAssessment(){
        return this.util.get('Create Assessment','buttonText','click');
    }

    clickSaveButton(){
        return this.util.get('Save','buttonText','click');
    }

    clickCloseButton(){
        return this.util.get('Close','buttonText','click');
    }

    enterText(){
        let e = this.util.get('/html/body/ngb-modal-window/div/div/div[2]/div[2]/div/div[1]/input','xpath','element');
        e.click();
        e.sendKeys("44");
    }


}