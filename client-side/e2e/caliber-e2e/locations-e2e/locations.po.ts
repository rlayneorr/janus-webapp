/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */

import { browser, by, element, ElementHelper } from 'protractor';


export class LocationsPage{

    navigateTo(){
        browser.get(browser.baseUrl+'/#/Caliber/home');
    }


    clickSettings(){
        let e = element(by.xpath('//*[@id="settingsMenu"]'));
        e.click();
    }

    clickLocationsButton(){
        let e = element(by.buttonText('Locations'));
        e.click();
    }

    clickCreateLocation(){
        let e = element(by.buttonText('Create Location'));
        e.click();
    }

    getModal(){

        return element(by.css('.modal-body'));

    }

}