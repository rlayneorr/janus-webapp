import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Dependencies } from './caliber.test.module';
import { CaliberComponent } from './caliber.component';

/**
 * Test if the caliber component creates the component and the app.
 *
 * @author Antonio Marrero Bonilla | 1803-USF-MAR26 | Wezley Singleton
 *
 * @author Byron Hall | 1803-USF-MAR26 | Wezley Singleton
 **/

/**
 * Setting up the testing environment for Caliber component testing.
 **/
describe('CaliberComponent', () => {
    let component: CaliberComponent;

    beforeEach(() => {
      component = new CaliberComponent();
    });

  /**
   * Test if the caliber component creates the app for caliber.
   **/
  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Check if the app has a title.
   **/
  it(`should have as title 'apps'`, () => {
    expect(component.title).toEqual('apps');
  });
});
