import { AppPage } from './manage-batches.po';
import { browser } from 'protractor';

describe('test-app Batch Management', () => {
  let page: AppPage;
 

  beforeEach(() => {
    page = new AppPage();
  });

  it('should land on management page', () => {
    page.navigateTo();
    expect(browser.getCurrentUrl()).toContain(page.util.getBaseUrl());
  });

  it('should navigate to batch overview page on click', () => {

    page.clickManageBatches();
    expect(browser.getCurrentUrl()).toContain(page.util.getBaseUrl()+'Caliber/manage');
  });

  it('should open modal on "Create Batch" button press', () => {

    page.clickCreateBatch();

    expect(page.util.get('//strong[contains(text(), "Training Name")]','xpath','text'));

  });

  it('should not update without required information', () => {
    page.clickUpdate();
    expect(page.util.get('//strong[contains(text(), "Training Name")]','xpath','text'));
  });

  it('should close on X press', () => {
    page.clickExit();
    expect(page.util.get('//strong[contains(text(), "Training Name")]','xpath','isPresent')).toBeFalsy();
  });

  it('should have an import batch button', () => {

    page.clickImport();
    expect(page.util.get('//strong[contains(text(),"Create New Batch")]','xpath','isPresent'));

  });

  it('should also close on eXit', () => {
    page.clickExit();
    expect(page.util.get('//strong[contains(text(),"Create New Batch")]','xpath','isPresent')).toBeFalsy();
  });


});
