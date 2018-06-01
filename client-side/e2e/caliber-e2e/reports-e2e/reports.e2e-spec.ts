/**
 * @author Bryce Charydczak | 1803-USF-MAR26 | Wezley Singleton
 */

import { AppPage } from './reports.po';
import { browser, element, by} from 'protractor';

describe('test-app Reports', () => {
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

  it('should click Reports navbar button and direct to reports page', () => {
    page.clickReportsNav();
    expect(browser.getCurrentUrl()).toContain(baseUrl + 'Caliber/reports');
  });

});
