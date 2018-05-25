import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { Dependencies } from './caliber.test.module';
import { CaliberComponent } from './caliber.component';

/**
   * Last modified by the Avengers
   *
   * Byron Hall | 1803-USF-MAR26 | Wezley Singleton
   *
   * Antonio Marrero Bonilla | 1803-USF-MAR26 | Wezley Singleton
   *
   */

fdescribe('CaliberComponent', () => {
    let component: CaliberComponent;

    beforeEach(() => {
      component = new CaliberComponent();
    });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'apps'`, () => {
    expect(component.title).toEqual('apps');
  });
});
