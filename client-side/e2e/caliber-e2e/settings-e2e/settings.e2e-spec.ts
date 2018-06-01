/**@author Dennis Park ❀ヅ❤♫| 1803-USF-MAR26 | Wezley Singleton */

import {SettingsPage} from './settings.po';
import { browser } from 'protractor';


describe('test-app Settings general', () => {
  let page = new SettingsPage;

  beforeEach(() => {
    page = new SettingsPage();
  });

  it('should be rendered on navbar', () => {
    page.navigateTo();
    expect(page.settingsMenu().isDisplayed()).toBeTruthy();
});


it('should have Trainers suboption', () => {
expect(page.trainersButton().isPresent()).toBeTruthy();
});

it('should have Locations suboption', () => {
    expect(page.locationsButton().isPresent()).toBeTruthy();
});

it('should have Skills suboption', () => {
    expect(page.skillsButton().isPresent()).toBeTruthy();
});

it('should have Screening suboption', () => {
    expect(page.screeningButton().isPresent()).toBeTruthy();
});



it('should not render Trainers', () => {
    expect(page.trainersButton().isDisplayed()).toBeFalsy();
});

it('should not render Locations', () => {
    expect(page.locationsButton().isDisplayed()).toBeFalsy();
});

it('should not render Skills', () => {
    expect(page.skillsButton().isDisplayed()).toBeFalsy();
});

it('should not render Screening', () => {
    expect(page.screeningButton().isDisplayed()).toBeFalsy();
});


it('should dropdown on click', () => {
page.settingsMenu().click();
});

            it('should render Trainers on dropdown', () => {
                expect(page.trainersButton().isDisplayed()).toBeTruthy();
            });

            it('should render Locations on dropdown', () => {
                expect(page.locationsButton().isDisplayed()).toBeTruthy();
            });

            it('should render Skills on dropdown', () => {
                expect(page.skillsButton().isDisplayed()).toBeTruthy();
            });

            it('should render Screening on dropdown', () => {
                expect(page.screeningButton().isDisplayed()).toBeTruthy();
            });

it('should close on additional click', () => {
    page.settingsMenu().click();
    });

            it('should not render Trainers', () => {
                expect(page.trainersButton().isDisplayed()).toBeFalsy();
            });
            
            it('should not render Locations', () => {
                expect(page.locationsButton().isDisplayed()).toBeFalsy();
            });
            
            it('should not render Skills', () => {
                expect(page.skillsButton().isDisplayed()).toBeFalsy();
            });
            
            it('should not render Screening', () => {
                expect(page.screeningButton().isDisplayed()).toBeFalsy();
            });

});