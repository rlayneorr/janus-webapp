/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */

import {TrainersPage} from './trainers.po';
import { browser, element, by } from 'protractor';


describe('test-app Trainers page', () => {
  let page = new TrainersPage;

  beforeEach(() => {
    page = new TrainersPage();
  });

  it('should navigate to Trainer service', () => {

    page.navigateTo();

    page.clickSettings();
    page.clickTrainerButton();

    expect(browser.getCurrentUrl()).toContain(browser.baseUrl+'/#/Caliber/settings/trainers');
    
  });

  it('should display the Trainer table', () => {

    expect(page.getTrainerTable().isDisplayed()).toBeTruthy();

  });

  it('should have some trainers in the table', () => {

    expect(page.allTrainers().count()).toBeGreaterThan(0);
  });



  it('should highlight on mouse-over', () => {

    //given every element on the page:
    page.allTrainers().each( function(trainerRow,index){

      var std;
      var hov;

      trainerRow.getCssValue('background-color').then(function(color){
        //check initial color
    std = color;
     //glide the mouse across the element
    browser.actions().mouseMove(trainerRow).perform();
    trainerRow.getCssValue('background-color').then(function(color){
      //get new color when moused over
      hov = color;
      //verify that they are not the same.
      expect(std===hov).toBeFalsy();
        });

      });

      });

  });

  it('should open add trainer modal', () => {

    page.clickAddButton();
    expect(page.getModal().isDisplayed()).toBeTruthy();

  });

  it('should have Add Trainer title', () => {
    expect(page.getModal().element(by.tagName('h4')).isDisplayed()).toBeTruthy();
  });

  it('should have First Name label', () => {

    expect(page.getModal().element(by.xpath('//label[text()="First Name:"]')).isDisplayed()).toBeTruthy();

  });

  it('should have Last Name label', () => {

    expect(page.getModal().element(by.xpath('//label[text()="Last Name:"]')).isDisplayed()).toBeTruthy();

  });

  it('should have Email label', () => {

    expect(page.getModal().element(by.xpath('//label[text()="Email:"]')).isDisplayed()).toBeTruthy();

  });

  it('should have Password label', () => {

    expect(page.getModal().element(by.xpath('//label[text()="Password:"]')).isDisplayed()).toBeTruthy();

  });

  it('should have Title label', () => {

    expect(page.getModal().element(by.xpath('//label[text()="Title:"]')).isDisplayed()).toBeTruthy();

  });

  it('should have Role label', () => {

    expect(page.getModal().element(by.xpath('//label[text()="Role:"]')).isDisplayed()).toBeTruthy();

  });

  it('should allow input for fields', () => {

    element.all(by.css('input[type="text"]')).each(function(elem,idx){
 

      elem.sendKeys('asdf');
 
      expect(elem.getAttribute('value')).toContain('asdf');

    });
  });

  



  });