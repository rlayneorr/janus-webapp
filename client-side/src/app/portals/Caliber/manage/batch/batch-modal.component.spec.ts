import { async, ComponentFixture, TestBed, tick, fakeAsync, inject } from '@angular/core/testing';

// Injected Services
import { BatchService } from '../../services/batch.service';
import { TrainingTypeService } from '../../services/training-type.service';
import { LocationService } from '../../services/location.service';
import { TrainerService } from '../../services/trainer.service';

import { Observable } from 'rxjs/Observable';
import { Dependencies } from '../../caliber.test.module';
import { BatchModalComponent } from './batch-modal.component';
import { GambitSkillService } from '../../../../gambit-client/services/skill/gambit-skill.service';

xdescribe('BatchModalComponent', () => {
  let component: BatchModalComponent;
  let fixture: ComponentFixture<BatchModalComponent>;

  let trainerService: TrainerService;
  let locationService: LocationService;
  let trainingTypeService: TrainingTypeService;
  let skillService: GambitSkillService;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(async(() => {
    fixture = TestBed.createComponent(BatchModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    trainerService = fixture.debugElement.injector.get(TrainerService);
    locationService = fixture.debugElement.injector.get(LocationService);
    trainingTypeService = fixture.debugElement.injector.get(TrainingTypeService);
    skillService = fixture.debugElement.injector.get(GambitSkillService);

    Observable.zip(
      trainerService.listSubject,
      locationService.listSubject,
      trainingTypeService.listSubject
    ).subscribe((results) => {
      component.setTrainers(results[0]);
      component.setLocations(results[1]);
      component.setTrainingTypes(results[2]);
    });
  }), 1440000);

  it('should create', async () => {
    expect(component).toBeTruthy();
  });

  it('select location', async((done) => {
    component.onLocationSelect(1);
    if (component.batch.address !== undefined) {
      expect(component.batch.address.city).toEqual('Queens');
    }
  }), 1440000);

});
