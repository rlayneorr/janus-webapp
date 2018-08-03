/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */

import { LocationsPage } from './locations.po';
import { browser, by, element } from 'protractor';


describe('test-app Locations page', () => {


  let page = new LocationsPage;

  beforeEach(() => {
    page = new LocationsPage();
  });

  it('should successfully navigate to Locations', () => {

    page.navigateTo();
    page.clickSettings();
    page.clickLocationsButton();

    expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '/#/Caliber/settings/locations');

  });

  it('should have a "Create Location" button', () => {

    page.clickCreateLocation();

    expect(page.getModal().isDisplayed()).toBeTruthy();

  });

  it('should not allow entry of empty data', () => {

    element(by.buttonText('Save')).click();

    expect(page.getModal().isDisplayed()).toBeTruthy();
  });

  it('should close on "Close"', () => {
    element(by.buttonText('Close')).click();

    expect(page.getModal().isPresent()).toBeFalsy();
  });

  it('should have Add Location title', () => {
    page.clickCreateLocation();
    expect(element(by.tagName('h4')).isDisplayed()).toBeTruthy();
  });

  it('should have Company Name label', () => {
    expect(page.getModal().element(by.xpath('//label[text()="Company Name:"]')).isDisplayed()).toBeTruthy();
  });

  it('should have Street Address label', () => {

    expect(page.getModal().element(by.xpath('//label[text()="Street Address:"]')).isDisplayed()).toBeTruthy();

  });

  it('should have City label', () => {

    expect(page.getModal().element(by.xpath('//label[text()="City:"]')).isDisplayed()).toBeTruthy();

  });

  it('should have State label', () => {

    expect(page.getModal().element(by.xpath('//label[text()="State:"]')).isDisplayed()).toBeTruthy();

  });

  it('should have Zipcode label', () => {

    expect(page.getModal().element(by.xpath('//label[text()="Company Name:"]')).isDisplayed()).toBeTruthy();

  });

  it('should allow input for fields', () => {

    element.all(by.css('input[type="text"]')).each(function (elem, idx) {


      elem.sendKeys('some data');

      expect(elem.getAttribute('value')).toContain('some data');

    });
  });

  it('should allow State select', () => {

    const e = element(by.tagName('select'));
    e.click();

    const s = element(by.css('option[value="GA"]'));
    s.click();

    expect(e.getAttribute('value')).toBe('GA');
  });

  it('should allow valid submission to save', () => {

    element(by.buttonText('Save')).click();
    expect(page.getModal().isPresent()).toBeFalsy();

  });

});
