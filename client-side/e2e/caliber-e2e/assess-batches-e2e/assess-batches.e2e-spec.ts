import { AssessPage } from './assess-batches.po';
import { browser } from 'protractor';

describe('test-app Batch Assessment', () => {
  let page: AssessPage;
 

  beforeEach(() => {
    page = new AssessPage();
  });

it('should navigate to assessment page', () => {

    page.navigateTo();
    expect(browser.getCurrentUrl()).toContain(page.util.getBaseUrl()+'Caliber/assess');

});

it('should have a "create assessment" button', () => {

    page.clickCreateAssessment();

    expect(page.util.get('.modal-title', 'css' ,'text'));

});

it('should not save bogus test', () =>{

    //page.clickSaveButton();

    expect(page.util.get('.modal-title', 'css' ,'text'));
});


it('should close on "close" button', () => {

    page.clickCloseButton();

    expect(page.util.get('.modal-title', 'css' ,'isPresent')).toBeFalsy();
});


/*
it('should save valid info', () => {

    page.clickCreateAssessment();
    page.enterText();
    //some more stuff
    page.clickSaveButton();
    expect(page.util.get('.modal-title', 'css' ,'isPresent')).toBeFalsy();

});

*/



});