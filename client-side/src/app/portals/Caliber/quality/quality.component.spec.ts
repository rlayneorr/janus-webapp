import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QualityComponent } from './quality.component';
import { Dependencies } from '../caliber.test.module';
import { BatchService } from '../../../gambit-client/aggregator/services/completebatch.service';
import { DisplayBatchByYear } from '../pipes/display-batch-by-year.pipe';
import { HttpClient } from '@angular/common/http';
import { GambitSkillTypeService } from '../../../gambit-client/services/skillType/gambit-skill-type.service';
import { GambitBatchService } from '../../../gambit-client/services/batch/gambit-batch.service';
import { UrlService } from '../../../gambit-client/services/urls/url.service';
import { CompleteBatch } from '../../../gambit-client/aggregator/entities/CompleteBatch';
import { GambitTrainer } from '../../../gambit-client/entities/GambitTrainer';
import { GambitAddress } from '../../../gambit-client/entities/GambitAddress';
import { GambitTrainee } from '../../../gambit-client/entities/GambitTrainee';

/**
 * Test for methods on the question component.
 *
 * @author Danny Chhun | 1803-USF-MAR26 | Wezley Singleton
 *
 **/

describe('QualityComponent', () => {
  const component: QualityComponent = new QualityComponent(new BatchService(<any> HttpClient,
  new GambitBatchService(<any> HttpClient, new UrlService),
  new GambitSkillTypeService(<any> HttpClient, new UrlService), new UrlService),
  new DisplayBatchByYear);
  const mockBatch1: CompleteBatch = new CompleteBatch();
  const mockBatch2: CompleteBatch = new CompleteBatch();
  const returnedBatch: CompleteBatch[] = [];
  const date18: Date = new Date('February 2, 2018');
  const date17: Date = new Date('February 2, 2017');
  component.batches = [mockBatch1, mockBatch2];

  beforeEach(() => {
    mockBatch1.startDate = date18;
    mockBatch2.startDate = date17;
    mockBatch1.batchId = 4;
    mockBatch2.batchId = 10;
  });

  /**
   * Test to see if component creates
   */
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Test if function gets current year
   */
  it('get full year', () => {
    expect(component.currentYear).toBe(2018);
  });

  /**
   * Test to see if method gets batched on a selected year
   */
  it('get by on select year', () => {
    component.onYearSelect(2018);
    expect(component.currentBatch).toBe(mockBatch1);
  });

  /**
   *  Test to see if method can't find a selected year it'll be null
   */
  it('get null if no select year', () => {
    component.onYearSelect(2019);
    expect(component.currentBatch).toBe(null);
  });

  /**
   * Test if method will get batch on current year
   */
  it('get batch of current year', () => {
    component.setCurrentYear(2017);
    console.log(component.currentYear);
    this.returnedBatch = component.getBatchesOfCurrentYear();
    expect(this.returnedBatch[0]).toBe(mockBatch2);
  });

  /**
   * Test tracked years
   */
  it('get tracked years', () => {
    const trackedYears = [2018, 2017, 2016];
    const returnedYears = component.getTrackedYears();
    console.log('trackyears:' + trackedYears);
    console.log('returnedyears:' + returnedYears);
    expect(returnedYears).toEqual(trackedYears);
  });

  /**
   * Test if method returns selected batch by ID
   */
  it('get a selected batch', () => {
    component.onBatchSelect(10);
    expect(component.currentBatch).toBe(mockBatch2);
  });
});
