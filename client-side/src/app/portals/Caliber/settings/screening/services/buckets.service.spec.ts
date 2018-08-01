import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';

import { UrlService } from '../../../../../gambit-client/services/urls/url.service';
import { BucketsService } from './buckets.service';
import { AlertsService } from '../../../services/alerts.service';
import { CategoryService } from '../../../services/category/category.service';
import { Bucket } from '../entities/Bucket';
import { Category } from '../../../entities/Category';
import { BUCKETS } from '../mock-data/mock-buckets';

 /**
 * Setting up the testing environment for Buckets service.
 **/
fdescribe('BucketsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule],
      providers: [BucketsService, UrlService, CategoryService, AlertsService]
    });
  });
  /**
  * Test to a constructor.
  **/
it('should be created', inject([BucketsService], (service: BucketsService) => {
    expect(service).toBeTruthy();
  }));
  /**
   * Test to get all buckets.
  **/
  it('should show all buckets', inject([BucketsService], (service: BucketsService) => {
    service.getAllBuckets().subscribe((response) => {
      expect(response).not.toEqual(null);
    });
  }));
  /**
  * Test to get a bucket by id.
  **/
  it('should get a bucket from an Id', inject([BucketsService], (service: BucketsService) => {
    const expected: Bucket[] = BUCKETS;
    service.getBucketById(3).subscribe((response) => {
      service.setBucket(response);
    expect(response.bucketId).toEqual(3);
    });
  }));
  /**
  * Test to update a bucket's category.
  **/
  it('should update a bucket', inject([BucketsService], (service: BucketsService) => {const newbucket = new Bucket();
    const expected: Bucket[] = BUCKETS;
    expected[4].bucketDescription = 'Updated Description';
    expected[4].category = 'Updated Category';
    expected[4].isActive = false;
    service.updateBucket(expected[4]);
    service.getBucketById(2).subscribe((response) => {
      service.setBucket(response);
      expect(expected[4].bucketDescription).toEqual('Updated Description');
    });
  }));
  /**
  * Test to create a new bucket.
  **/
  it('should create a bucket', inject([BucketsService], (service: BucketsService) => {
    const expected: Bucket[] = BUCKETS;
    expected[4].bucketDescription = 'Test Description';
    expected[4].category = 'New Category';
    expected[4].categoryId = 4;
    expected[4].bucketId = 5;
    expected[4].isActive = false;
    service.createNewBucket(expected[5]);
    service.getBucketById(5).subscribe((response) => {
     service.setBucket(response);
     expect(expected[5].bucketDescription).toEqual('Test Description');
    });
  }));
  /**
  * Test to delete a certain bucket by id.
  **/
  it('should delete a bucket', inject([BucketsService], (service: BucketsService) => {
    const expected: Bucket[] = BUCKETS;
    service.deleteBucket(4);
    service.getBucketById(4).subscribe((response) => {
      service.setBucket(response);
      expect(service.getDescription).toEqual(null);
      });
  }));

});
