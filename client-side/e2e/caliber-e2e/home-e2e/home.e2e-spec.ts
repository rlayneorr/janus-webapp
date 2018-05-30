/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */


import { HomePage } from './home.po';
import { browser } from 'protractor';

describe('test-app Home Screen', () => {
  let page: HomePage;
  const baseUrl: String = browser.baseUrl + '/#/';

  beforeEach(() => {
    page = new HomePage();
  });

//check for Janus Homepage rendering
  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getTitleText()).toEqual('Please Select One Of the Following Applications :');
  });

  it('should display Caliber button', () => {
    expect(page.getCaliberTitleText()).toEqual('Caliber');
  });

  it('should click Caliber button and go to Caliber home page', () => {
    page.clickCaliberButton();
    expect(browser.getCurrentUrl()).toContain(baseUrl + 'Caliber/home');
  });


});
