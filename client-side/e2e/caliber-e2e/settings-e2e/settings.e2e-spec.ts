/**@author Dennis Park | 1803-USF-MAR26 | Wezley Singleton */

import {SettingsPage} from './settings.po';
import { browser } from 'protractor';
// const PanelPage = require('./panel.po');
const baseUrl: String = browser.baseUrl + '/#/';
describe('test-app Settings general', () => {
  let page = new SettingsPage;

  beforeEach(() => {
    page = new SettingsPage();
  });

  it('should be rendered on navbar', () => {
    page.navigateTo();
    expect(page.util.get('//*[@id="settingsMenu"]','xpath','text'));
});


it('should have Trainers suboption', () => {
expect(page.util.get('Trainers','buttonText','isPresent'));
});

it('should have Locations suboption', () => {
    expect(page.util.get('Locations','buttonText','isPresent'));
});

it('should have Skills suboption', () => {
    expect(page.util.get('Skills','buttonText','isPresent'));
});

it('should have Screening suboption', () => {
    expect(page.util.get('Screening','buttonText','isPresent'));
});



it('should not render Trainers', () => {
    expect(page.util.get('Trainers','buttonText','isDisplayed')).toBeFalsy();
});

it('should not render Locations', () => {
    expect(page.util.get('Locations','buttonText','isDisplayed')).toBeFalsy();
});

it('should not render Skills', () => {
    expect(page.util.get('Skills','buttonText','isDisplayed')).toBeFalsy();
});

it('should not render Screening', () => {
    expect(page.util.get('Screening','buttonText','isDisplayed')).toBeFalsy();
});


it('should dropdown on click', () => {
page.clickSettings();
});

            it('should render Trainers on dropdown', () => {
                expect(page.util.get('Trainers','buttonText','isDisplayed')).toBeTruthy();
            });

            it('should render Locations on dropdown', () => {
                expect(page.util.get('Locations','buttonText','isDisplayed')).toBeTruthy();
            });

            it('should render Skills on dropdown', () => {
                expect(page.util.get('Skills','buttonText','isDisplayed')).toBeTruthy();
            });

            it('should render Screening on dropdown', () => {
                expect(page.util.get('Screening','buttonText','isDisplayed')).toBeTruthy();
            });

it('should close on additional click', () => {
    page.clickSettings();
    });

            it('should not render Trainers', () => {
                expect(page.util.get('Trainers','buttonText','isDisplayed')).toBeFalsy();
            });
            
            it('should not render Locations', () => {
                expect(page.util.get('Locations','buttonText','isDisplayed')).toBeFalsy();
            });
            
            it('should not render Skills', () => {
                expect(page.util.get('Skills','buttonText','isDisplayed')).toBeFalsy();
            });
            
            it('should not render Screening', () => {
                expect(page.util.get('Screening','buttonText','isDisplayed')).toBeFalsy();
            });

});