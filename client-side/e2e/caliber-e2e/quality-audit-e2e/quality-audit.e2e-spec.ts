/**
 * @author Bryce Charydczak | 1803-USF-MAR26 | Wezley Singleton
 */

import { AppPage } from './quality-audit.po';
import { browser, element, by} from 'protractor';

describe('test-app Quality Audit', () => {
  let page: AppPage;
  const baseUrl: String = browser.baseUrl + '/#/';

  beforeEach(() => {
    page = new AppPage();
  });

  it('should launch the dashboard of Janus', () => {
    page.navigateTo();
    expect(browser.getCurrentUrl()).toContain(baseUrl + 'dashboard');
  });

  it('should click Calibur Icon button and direct to Calibur home page', () => {
    page.clickCaliberButton();
    expect(browser.getCurrentUrl()).toContain(baseUrl + 'Caliber/home');
  });

  it('should click Quality Audit navbar button and direct to quality audit page', () => {
    page.clickQualityAuditNav();
    expect(browser.getCurrentUrl()).toContain(baseUrl + 'Caliber/quality');
  });
  
});