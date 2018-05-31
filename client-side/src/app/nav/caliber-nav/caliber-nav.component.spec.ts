import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Dependencies } from '../../app.test.module';
import { CaliberNavComponent } from './caliber-nav.component';
import { RouteService } from '../../portals/Caliber/services/route.service';
import { CookieService } from 'ngx-cookie-service';

/**
 * Test for methods on the question component.
 *
 * @author Antonio Marrero Bonilla | 1803-USF-MAR26 | Wezley Singleton
 *
 * @author Byron Hall | 1803-USF-MAR26 | Wezley Singleton
 **/

describe('CaliberNavComponent', () => {
  const component: CaliberNavComponent = new CaliberNavComponent(new RouteService, new CookieService(document));

  /**
   * See if the properties are populated
   *
   * Function tested: ngOnInit()
   */
  it('should initialize properties', () => {
    component.ngOnInit();
    expect(component.showHome).toBeTruthy();
    expect(component.showManage).toBeFalsy();
    expect(component.showAssess).toBeFalsy();
    expect(component.showQuality).toBeFalsy();
    expect(component.showPanel).toBeFalsy();
    expect(component.showScreening).toBeFalsy();
    expect(component.showReports).toBeTruthy();
  });

  /**
   * See if the nav bar toggles
   *
   * Function tested: toggleCollapse()
   */

   it('should collapse', () => {
    expect(component.collapsed).toBeFalsy();
    component.toggleCollapse();
    expect(component.collapsed).toBeTruthy();
   });
});
