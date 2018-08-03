/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */
/**@author Bryce Charydczak | 1803-USF-MAR26 | Wezley Singleton */

import { AppPage } from './manage-batches.po';
import { browser } from 'protractor';

describe('test-app Batch Management', () => {
  let page: AppPage;

  beforeEach(() => {
    page = new AppPage();
  });

  it('should display management page', () => {
    page.navigateTo();
    expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '/#/Caliber/manage');
  });

  it('should navigate to sane page page on click', () => {

    page.clickManageBatches();
    expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '/#/Caliber/manage');
  });

  it('should open modal on "Create Batch" button press', () => {

    page.clickCreateBatch();

    expect(page.getModal().isDisplayed()).toBeTruthy();
  });

  it('should not update without required information', () => {
    page.clickUpdate();
    expect(page.getModal().isDisplayed()).toBeTruthy();
  });

  it('should close on X press', () => {
    page.clickExit();
    expect(page.getModal().isPresent()).toBeFalsy();
  });

  it('should have an import batch button', () => {
    page.clickImport();
    expect(page.getModal().isDisplayed()).toBeTruthy();

  });

  it('should also close on eXit', () => {
    page.clickExit();
    expect(page.getModal().isPresent()).toBeFalsy();
  });

});
