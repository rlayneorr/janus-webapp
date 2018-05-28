// Testing Modules
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

// Modules
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs/Subscription';

// Imports from Caliber.test.module.ts
import { Dependencies } from '../../caliber.test.module';

// Components
import { LocationsComponent } from './locations.component';

// Services
import { LocationService } from '../../../../gambit-client/services/location/location.service';

/**
 * Test for methods on the locations component.
 *
 * @author Antonio Marrero Bonilla | 1803-USF-MAR26 | Wezley Singleton
 *
 * @author Byron Hall | 1803-USF-MAR26 | Wezley Singleton
 **/

 /**
 * Setting up the testing environment for locations component.
 *
 * In order run test on this component, go to Caliber/caliber.test.module and uncomment
 * the LocationService that comes from the * gambit-client and comment the one
 * that comes from the location service right above the one that is commented out.
 * Uncomment this: import { LocationService } from '../../gambit-client/services/location/location.service';
 * Comment this: import { LocationService } from './services/location.service';
 **/
describe('LocationsComponent', () => {
  let component: LocationsComponent;
  let fixture: ComponentFixture<LocationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Should create a locations component.
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
