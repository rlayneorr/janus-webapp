import { AppPage } from './manage-batches.po';
import { browser } from 'protractor';

describe('test-app Batch Management', () => {
  let page: AppPage;
  const baseUrl: String = browser.baseUrl + '/#/';

  beforeEach(() => {
    page = new AppPage();
  });

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

  it('should click Manage Batches button and go to Batch overview page', () => {
    page.clickManageBatches();
    expect(browser.getCurrentUrl()).toContain(baseUrl + 'Caliber/manage');
  });
});
