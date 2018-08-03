/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */

import { browser, by, element, ElementHelper } from 'protractor';

export class ScreeningPage {

    navigateTo() {
        browser.get(browser.baseUrl + '/#/Caliber/settings/screening');
    }

    clickCreateSkillType() {
        const e = element(by.buttonText('Create Skill Type'));
        e.click();
    }

    clickCreateButton() {
        const e = element(by.buttonText('Create'));
        e.click();
    }

    clickCloseButton() {
        const e = element(by.buttonText('Close'));
        e.click();
    }

    clickScreeningButton() {
        const e = element(by.buttonText('Screening'));
        e.click();
    }

    clickSettings() {
        const e = element(by.linkText('Settings'));
        e.click();
    }

    clickSkillField() {
        const e = element(by.xpath('//*[@id="skillTypeName"]'));
        e.click();
        e.sendKeys('Java');
    }

    getBucketHeader() {
        return element(by.xpath('//h6[text()="All Buckets"]'));
    }

    getHeader() {
        return element(by.xpath('//h6[text()="Skill Types"]'));
    }

    highlightButtons(e) {
        const before = e.getCssValue('background-color');
        browser.actions().mouseMove(e).perform();
        const after = e.getCssValue('background-color');
        return (before === after);
    }



    clickAllBuckets() {
        const e = element(by.linkText('All Buckets'));
        e.click();
    }

    clickExitButton() {
        const e = element(by.css('.close'));
        e.click();
    }

    clickCreateBucket() {
        const e = element(by.buttonText('Create Bucket'));
        e.click();
    }

    modalView() {
        return element(by.css('.modal-content'));
    }

    searchBucketField() {
        return element(by.xpath('//*[@id="allSkillTypesDiv"]/div[1]/div/input'));
    }
}
