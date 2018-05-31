/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */


import { browser, by, element, ElementHelper } from 'protractor';


export class AssessPage{


  
    navigateTo() {
     browser.get(browser.baseUrl+'/#/Caliber/assess');
    }

    clickCreateAssessment(){

       let e = element(by.buttonText('Create Assessment'));
       e.click();

    }

    clickSaveButton(){
        let e = element(by.buttonText('Save'));
       e.click();
    }

    clickCloseButton(){
        let e = element(by.buttonText('Close'));
        e.click();
    }

    enterText(){
        let e = element(by.css('input[type="number"]'));
        e.click();
        e.sendKeys("44");
    }


}