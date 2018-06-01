/**@author Dennis Park ❀ヅ❤♫| 1803-USF-MAR26 | Wezley Singleton */

import { browser, by, element, ElementHelper } from 'protractor';

export class ScreeningPage{

  

    navigateTo(){
        browser.get(browser.baseUrl+'/#/Caliber/settings/screening');
        //this.util.navigateTo('/Caliber/home');
    }

    clickCreateSkillType(){

        let e = element(by.buttonText('Create Skill Type'));
        e.click();
    }

    clickCreateButton(){
        let e = element(by.buttonText('Create'));
        e.click();
    }

    clickCloseButton(){

        let e = element(by.buttonText('Close'));
        e.click();
  
    }

    clickScreeningButton(){

        let e = element(by.buttonText('Screening'));
        e.click();

    }

    clickSettings(){

        let e = element(by.linkText('Settings'));
        e.click();

    }

    clickSkillField(){
        let e = element(by.xpath('//*[@id="skillTypeName"]'));
        e.click();
        e.sendKeys("Java");
    }

    getBucketHeader(){
        return element(by.xpath('//h6[text()="All Buckets"]'));

    }

    getHeader(){
        return element(by.xpath('//h6[text()="Skill Types"]'));
    }

    highlightButtons(e){
        let before = e.getCssValue('background-color');
        browser.actions().mouseMove(e).perform();
        let after = e.getCssValue('background-color');
        return (before===after);
    }



    clickAllBuckets(){
        let e = element(by.linkText('All Buckets'));
        e.click();

    }



    clickExitButton(){
       let e = element(by.css('.close'));
        e.click();

    }

    clickCreateBucket(){

        let e = element(by.buttonText('Create Bucket'));
        e.click();

    }

    modalView(){

        return element(by.css('.modal-content'));
    }

    searchBucketField(){
        return element(by.xpath('//*[@id="allSkillTypesDiv"]/div[1]/div/input'));
    }

    


}