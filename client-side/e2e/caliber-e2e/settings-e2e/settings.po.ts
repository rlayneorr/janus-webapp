/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */

import { browser, by, element, ElementHelper } from 'protractor';

export class SettingsPage {

    navigateTo() {
        browser.get(browser.baseUrl + '/#/Caliber/home');
    }

    settingsMenu() {
        return element(by.xpath('//*[@id="settingsMenu"]'));
    }

    trainersButton() {
        return element(by.buttonText('Trainers'));
    }

    locationsButton() {
        return element(by.buttonText('Locations'));
    }

    skillsButton() {
        return element(by.buttonText('Skills'));
    }

    screeningButton() {
        return element(by.buttonText('Screening'));
    }

}
