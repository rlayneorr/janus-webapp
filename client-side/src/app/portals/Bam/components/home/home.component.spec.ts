import { async, ComponentFixture, TestBed, inject } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Dependencies } from '../../bam.test-observable.module';
import { BamUser } from '../../models/bamuser.model';
import { SessionService } from '../../services/session.service';
import { of } from 'rxjs/observable/of';
import { HomeUtil } from './home-test.util';


fdescribe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const user: BamUser = HomeUtil.getUserById(2);

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    const sessionService: SessionService = TestBed.get(SessionService);

    spyOn(sessionService, 'putUserInSession').and.returnValue(of(user));

    TestBed.overrideProvider(SessionService, { useValue: sessionService });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('home should get get a BamUser', async(() => {
    component.ngOnInit();
    expect(component.currentUser).toEqual(user);
  }));
});
