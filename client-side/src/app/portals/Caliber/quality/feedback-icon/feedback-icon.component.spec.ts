import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';
import { FeedbackIconComponent } from './feedback-icon.component';
import { Dependencies } from '../../caliber.test.module';
describe('FeedbackIconComponent', () => {
  let component: FeedbackIconComponent;
  let fixture: ComponentFixture<FeedbackIconComponent>;

    beforeEach(() => {
      TestBed.configureTestingModule({
        declarations: [FeedbackIconComponent],
        imports: [],
        providers: []
      });
    });

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedbackIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('getStatusIconClass', () => {
    const STATUS_SUPERSTAR = 'Superstar';
    const STATUS_GOOD = 'Good';
    const STATUS_AVERAGE = 'Average';
    const STATUS_POOR = 'Poor';
    const STATUS_UNDEFINED = 'Undefined';

    component.status = STATUS_SUPERSTAR;

    component.getStatusIconClass();

   expect(component.getStatusIconClass()).toEqual({
      'fa': true,
      'fa-star': true,
      'fa-smile-o': false,
      'fa-meh-o': false,
      'fa-frown-o': false,
      'fa-question': false,
      'mx-2': true,
    });
  });

  it('getStatusIconClassStatusGood', () => {
    const STATUS_SUPERSTAR = 'Superstar';
    const STATUS_GOOD = 'Good';
    const STATUS_AVERAGE = 'Average';
    const STATUS_POOR = 'Poor';
    const STATUS_UNDEFINED = 'Undefined';

    component.status = STATUS_GOOD;

    component.getStatusIconClass();

  expect(component.getStatusIconClass()).toEqual({
      'fa': true,
      'fa-star': false,
      'fa-smile-o': true,
      'fa-meh-o': false,
      'fa-frown-o': false,
      'fa-question': false,
      'mx-2': true,
    });
 });

  it('getStatusIconClassStatusAverage', () => {
    const STATUS_SUPERSTAR = 'Superstar';
    const STATUS_GOOD = 'Good';
    const STATUS_AVERAGE = 'Average';
    const STATUS_POOR = 'Poor';
    const STATUS_UNDEFINED = 'Undefined';

    component.status = STATUS_AVERAGE;

    component.getStatusIconClass();

      expect(component.getStatusIconClass()).toEqual({
      'fa': true,
      'fa-star': false,
      'fa-smile-o': false,
      'fa-meh-o': true,
      'fa-frown-o': false,
      'fa-question': false,
      'mx-2': true,
    });
   });

  it('getStatusIconClassStatusPoor', () => {
    const STATUS_SUPERSTAR = 'Superstar';
    const STATUS_GOOD = 'Good';
    const STATUS_AVERAGE = 'Average';
    const STATUS_POOR = 'Poor';
    const STATUS_UNDEFINED = 'Undefined';

    component.status = STATUS_POOR;

    component.getStatusIconClass();

   expect(component.getStatusIconClass()).toEqual({
      'fa': true,
      'fa-star': false,
      'fa-smile-o': false,
      'fa-meh-o': false,
      'fa-frown-o': true,
      'fa-question': false,
      'mx-2': true,
    });
});

  it('getStatusIconClassStatusUndefined', () => {
    const STATUS_SUPERSTAR = 'Superstar';
    const STATUS_GOOD = 'Good';
    const STATUS_AVERAGE = 'Average';
    const STATUS_POOR = 'Poor';
    const STATUS_UNDEFINED = 'Undefined';

    component.status = STATUS_UNDEFINED;

    component.getStatusIconClass();

    expect(component.getStatusIconClass()).toEqual({
      'fa': true,
      'fa-star': false,
      'fa-smile-o': false,
      'fa-meh-o': false,
      'fa-frown-o': false,
      'fa-question': true,
      'mx-2': true,
    });
});

  it('getStatusIconClasscsstrue', () => {
    const STATUS_SUPERSTAR = 'Superstar';
    const STATUS_GOOD = 'Good';
    const STATUS_AVERAGE = 'Average';
    const STATUS_POOR = 'Poor';
    const STATUS_UNDEFINED = 'Undefined';

    component.status = STATUS_GOOD;
    component.css = 'blue';

    component.getStatusIconClass();

  expect(component.getStatusIconClass()).toEqual({
      'fa': true,
      'fa-star': false,
      'fa-smile-o': true,
      'fa-meh-o': false,
      'fa-frown-o': false,
      'fa-question': false,
      'mx-2': true,
      'blue' : true,
    });
  });
});
