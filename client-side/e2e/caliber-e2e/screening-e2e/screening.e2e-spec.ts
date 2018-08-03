/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */
/**@author Bryce Charydczak | 1803-USF-MAR26 | Wezley Singleton */
import { ScreeningPage } from './screening.po';
import { browser, by, element, ElementHelper } from 'protractor';


describe('test-app Screening page test', () => {
  let page = new ScreeningPage;

  beforeEach(() => {
    page = new ScreeningPage();
  });

  it('should successfully navigate to screening page', () => {

    page.navigateTo();
    page.clickSettings();
    page.clickScreeningButton();
    expect(browser.getCurrentUrl()).toContain(browser.baseUrl + '/#/Caliber/settings/screening');

  });

  it('should have a "Skill Types" tab', () => {
    expect(element(by.linkText('Skill Types')).isDisplayed()).toBeTruthy();
  });

  it('should highlight "Skill Types" on hover', () => {

    const e = element(by.linkText('Skill Types'));
    expect(page.highlightButtons(e)).toBeFalsy();

  });

  it('should display Skill Types', () => {


    expect(page.getHeader()).toBeTruthy();

  });

  it('should have a "Create Skill Type" button', () => {

    page.clickCreateSkillType();
    expect(page.modalView().isDisplayed()).toBeTruthy();
  });

  it('should not allow empty submit', () => {

    page.clickCreateButton();
    expect(page.modalView().isDisplayed()).toBeTruthy();
  });


  it('should close on Close', () => {

    page.clickExitButton();

    expect(page.modalView().isPresent()).toBeFalsy();

  });

  it('should also close on exit', () => {

    page.clickCreateSkillType();
    page.clickExitButton();

    expect(page.modalView().isPresent()).toBeFalsy();
  });

  it('should allow data entry', () => {
    page.clickCreateSkillType();
    page.clickSkillField();

    expect(element(by.xpath('//*[@id="skillTypeName"]')).getAttribute('value')).toContain('Java');
  });

  it('should submit valid data', () => {

    page.clickCreateButton();
    expect(page.modalView().isPresent()).toBeFalsy();
  });

  it('should have an "All Buckets" tab', () => {

    expect(element(by.linkText('All Buckets'))).toBeTruthy();
  });

  it('should highlight "All Buckets" on hover', () => {

    const e = element(by.linkText('All Buckets'));
    expect(page.highlightButtons(e)).toBeFalsy();

  });

  it('should switch to "All Buckets" tab on click', () => {

    page.clickAllBuckets();
    expect(page.getBucketHeader()).toBeTruthy();

  });

  it('should have "search buckets" field', () => {

    expect(page.searchBucketField().isDisplayed()).toBeTruthy();

  });

  it('should allow input to search buckets field', () => {

    page.searchBucketField().sendKeys('asdf');

    expect(page.searchBucketField().getAttribute('value')).toContain('asdf');
  });

  it('should have working Create Bucket button', () => {

    page.clickCreateBucket();

    expect(page.modalView().isDisplayed()).toBeTruthy();

  });

  it('should have name field', () => {

    expect(element(by.xpath('//label[text()="Name:"]')).isDisplayed()).toBeTruthy();
  });

  it('should allow for name input', () => {

    const e = page.modalView().element(by.tagName('input'));
    e.sendKeys('Bob Marley');
    expect(e.getAttribute('value')).toContain('Bob Marley');

  });

  it('should have description field', () => {

    expect(element(by.xpath('//label[text()="Description:"]')).isDisplayed()).toBeTruthy();
  });

  it('should allow description input', () => {

    const e = page.modalView().element(by.tagName('textarea'));
    e.sendKeys('a Reggae musician');
    expect(e.getAttribute('value')).toBeTruthy();
  });

  it('should submit on create', () => {
    page.clickCreateButton();
    expect(page.modalView().isPresent()).toBeFalsy();
  });

  it('should close on Close button', () => {

    page.clickCreateBucket();
    page.clickCloseButton();
    expect(page.modalView().isPresent()).toBeFalsy();
  });

  it('should close on X button', () => {

    page.clickCreateBucket();
    page.clickExitButton();
    expect(page.modalView().isPresent()).toBeFalsy();
  });

});
