/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */


import { AssessPage } from './assess-batches.po';
import { browser,element,by } from 'protractor';

describe('test-app Batch Assessment', () => {
  let page: AssessPage;
 

  beforeEach(() => {
    page = new AssessPage();
  });

it('should navigate to assessment page', () => {

    page.navigateTo();
    expect(browser.getCurrentUrl()).toContain(browser.baseUrl+'/#/Caliber/assess');

});

it('should have a "create assessment" button', () => {

    page.clickCreateAssessment();
    expect(element(by.css('.modal-content')).isDisplayed()).toBeTruthy();

});




it('should close on "close" button', () => {

    page.clickCloseButton();

    expect(element(by.css('.modal-content')).isPresent()).toBeFalsy();
});






});