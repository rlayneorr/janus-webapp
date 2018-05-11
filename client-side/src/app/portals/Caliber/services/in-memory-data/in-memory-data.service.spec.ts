import { TestBed, inject } from '@angular/core/testing';

import { InMemoryDataService } from './in-memory-data.service';

describe('InMemoryDataService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InMemoryDataService]
    });
  });

  it('should be created', inject([InMemoryDataService], (service: InMemoryDataService) => {
    expect(service).toBeTruthy();
  }));

  it('createDb shold create the correct buckets', inject([InMemoryDataService], (service: InMemoryDataService) => {
    const expectedBuckets = [
      { id: 1, name: 'OOP', description: 'Inheritance, polymorphism, encapsulation, abstraction', isActive: true },
      { id: 12, name: 'SQL', description: 'Database knowledge', isActive: true },
      { id: 13, name: 'REST', description: 'Consume, and exposing RESTful service', isActive: false },
      { id: 14, name: 'Front-end', description: 'Plan design client side structure and attributes', isActive: true },
      { id: 15, name: 'Back-end', description: 'Clean up the junk in the trunk' },
      { id: 16, name: 'United-BA', description: 'I will talk to you, and will do something?' },
      { id: 17, name: 'Canoeing 101', description: 'Remember not the canoe by a waterfall' },
      { id: 18, name: 'PEGA', description: 'Cut the horn and don\'t let it fly' },
      { id: 50, name: 'SalesForce 101', description: 'Just copy and past it, wash rinse, repeat' },
      { id: 17, name: 'AP PION?', description: 'Suggest all tech you know' }
    ];

    const returnedBuckets = service.createDb();

    expect(returnedBuckets).toContain(expectedBuckets);
  }));
});
