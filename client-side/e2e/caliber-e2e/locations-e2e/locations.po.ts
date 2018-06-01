/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */

import { browser, by, element, ElementHelper } from 'protractor';


export class LocationsPage {

    navigateTo() {
        browser.get(browser.baseUrl + '/#/Caliber/home');
    }


    clickSettings() {
        const e = element(by.xpath('//*[@id="settingsMenu"]'));
        e.click();
    }

    clickLocationsButton() {
        const e = element(by.buttonText('Locations'));
        e.click();
    }

    clickCreateLocation() {
        const e = element(by.buttonText('Create Location'));
        e.click();
    }

    getModal() {
        return element(by.css('.modal-body'));
    }

}
