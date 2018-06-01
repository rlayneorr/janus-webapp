/**@author Dennis Park ❀ヅ❤♫| 1803-USF-MAR26 | Wezley Singleton */
/**@author Bryce Charydczak | 1803-USF-MAR26 | Wezley Singleton */
import {PanelPage} from './panel.po';
import { browser } from 'protractor';
// const PanelPage = require('./panel.po');
const baseUrl: String = browser.baseUrl + '/#/';
describe('test-app Panel page', () => {
  let page = new PanelPage;

  beforeEach(() => {
    page = new PanelPage();
  });

  it('should land on panel page', () => {
    page.navigateTo();
    expect(browser.getCurrentUrl()).toContain(baseUrl+'Caliber/panel');
  });

  it('should have a create panel button', () => {

    expect(page.getCreatePanelButton()).toBeTruthy();
  });




});