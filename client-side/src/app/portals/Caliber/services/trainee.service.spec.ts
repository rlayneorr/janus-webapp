import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { AlertsService } from './alerts.service';
import { TraineeService } from './trainee.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';

const context = environment.trainee;

const saveUri = context.save();
const updateUri = context.update();



describe('TraineeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        TraineeService,
        HttpClient,
        AlertsService
      ]
    });
  });

  it('should be created', inject([TraineeService], (service: TraineeService) => {
    expect(service).toBeTruthy();
  }));
  it (
    'should create trainee',
    inject(
      [HttpTestingController, TraineeService],
      (
        httpMock: HttpTestingController,
        traineeService: TraineeService
      ) => {


        const mockBranch = {resourceId: 2, trainingName: 'cool kids', trainer: 1, cotrainer: 2, skillType: 'Microservices',
        trainingType: 'Lecture', startDate: new Date('March 5, 2018 08:35:00'), endDate: new Date('May 18, 2018 05:00:00'),
        location: 'USF', curriculum: 'Microservices', skills: 4,
        trainees: [], notes: 'The Good Ones', batchId: 1803};

        const mockHydraTrainee = {traineeId: 1, resourceId: 1, trainingStatus: 'Good', batch: mockBranch, phoneNumber: '555-555-5555',
        skypeId: 'ConfusedMan', profileUrl: 'http://www.revature.com/confused', recruiterName: 'Edward Hulse',
        college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science', techScreenerName: 'hard to pronounce',
        projectCompletion: 'yes', flagStatus: 'yes', flagNotes: 'none', marketingStatus: 'marketable', client: 'JP Morgan Chase',
        endClient: 'Super Revature', traineeUserInfo: {}};

        const mockTrainee = { traineeId: 1, resourceId: 1, name: 'Confused Userman', email: 'Confused@website.com',
        trainingStatus: 'Beginner', phoneNumber: '555-555-5555', skypeId: 'ConfusedMan', profileUrl: 'http://revature.com/confused',
        recruiterName: 'Edward Hulse', college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science',
        techScreenerName: 'Hard to pronounce', projectCompletion: 'Yes', batch: mockBranch };

        traineeService.create(mockTrainee).subscribe((myTrainee) => {
          expect(myTrainee).toEqual(mockTrainee);
        });

        const mockReq = httpMock.expectOne(saveUri);

        mockReq.flush(mockTrainee);

        httpMock.verify();

      }
    )
  );
  it (
    'should initialize savedSubject',
    inject(
      [HttpTestingController, TraineeService],
      (
        httpMock: HttpTestingController,
        traineeService: TraineeService
      ) => {


        const mockBranch = {resourceId: 2, trainingName: 'cool kids', trainer: 1, cotrainer: 2, skillType: 'Microservices',
        trainingType: 'Lecture', startDate: new Date('March 5, 2018 08:35:00'), endDate: new Date('May 18, 2018 05:00:00'),
        location: 'USF', curriculum: 'Microservices', skills: 4,
        trainees: [], notes: 'The Good Ones', batchId: 1803};

        const mockHydraTrainee = {traineeId: 1, resourceId: 1, trainingStatus: 'Good', batch: mockBranch, phoneNumber: '555-555-5555',
        skypeId: 'ConfusedMan', profileUrl: 'http://www.revature.com/confused', recruiterName: 'Edward Hulse',
        college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science', techScreenerName: 'hard to pronounce',
        projectCompletion: 'yes', flagStatus: 'yes', flagNotes: 'none', marketingStatus: 'marketable', client: 'JP Morgan Chase',
        endClient: 'Super Revature', traineeUserInfo: {}};

        const mockTrainee = { traineeId: 1, resourceId: 1, name: 'Confused Userman', email: 'Confused@website.com',
        trainingStatus: 'Beginner', phoneNumber: '555-555-5555', skypeId: 'ConfusedMan', profileUrl: 'http://revature.com/confused',
        recruiterName: 'Edward Hulse', college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science',
        techScreenerName: 'Hard to pronounce', projectCompletion: 'Yes', batch: mockBranch };

        traineeService.pushToSaved(mockTrainee);

        traineeService.savedSubject.asObservable().subscribe((myTrainee) => {
            expect(myTrainee).toEqual(mockTrainee);
        });
      }
    )
  );
  it (
    'should update trainee',
    inject(
      [HttpTestingController, TraineeService],
      (
        httpMock: HttpTestingController,
        traineeService: TraineeService
      ) => {


        const mockBranch = {resourceId: 2, trainingName: 'cool kids', trainer: 1, cotrainer: 2, skillType: 'Microservices',
        trainingType: 'Lecture', startDate: new Date('March 5, 2018 08:35:00'), endDate: new Date('May 18, 2018 05:00:00'),
        location: 'USF', curriculum: 'Microservices', skills: 4,
        trainees: [], notes: 'The Good Ones', batchId: 1803};

        const mockHydraTrainee = {traineeId: 1, resourceId: 1, trainingStatus: 'Good', batch: mockBranch, phoneNumber: '555-555-5555',
        skypeId: 'ConfusedMan', profileUrl: 'http://www.revature.com/confused', recruiterName: 'Edward Hulse',
        college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science', techScreenerName: 'hard to pronounce',
        projectCompletion: 'yes', flagStatus: 'yes', flagNotes: 'none', marketingStatus: 'marketable', client: 'JP Morgan Chase',
        endClient: 'Super Revature', traineeUserInfo: {}};

        const mockTrainee = { traineeId: 1, resourceId: 1, name: 'Confused Userman', email: 'Confused@website.com',
        trainingStatus: 'Beginner', phoneNumber: '555-555-5555', skypeId: 'ConfusedMan', profileUrl: 'http://revature.com/confused',
        recruiterName: 'Edward Hulse', college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science',
        techScreenerName: 'Hard to pronounce', projectCompletion: 'Yes', batch: mockBranch };

        traineeService.update(mockTrainee).subscribe((myTrainee) => {
          expect(myTrainee).toEqual(mockTrainee);
        });

        const mockReq = httpMock.expectOne(updateUri);

        mockReq.flush(mockTrainee);

        httpMock.verify();

      }
    )
  );
  it (
    'delete function should send request to trainee delete endpoint',
    inject(
      [HttpTestingController, TraineeService],
      (
        httpMock: HttpTestingController,
        traineeService: TraineeService
      ) => {


        const mockBranch = {resourceId: 2, trainingName: 'cool kids', trainer: 1, cotrainer: 2, skillType: 'Microservices',
        trainingType: 'Lecture', startDate: new Date('March 5, 2018 08:35:00'), endDate: new Date('May 18, 2018 05:00:00'),
        location: 'USF', curriculum: 'Microservices', skills: 4,
        trainees: [], notes: 'The Good Ones', batchId: 1803};

        const mockHydraTrainee = {traineeId: 1, resourceId: 1, trainingStatus: 'Good', batch: mockBranch, phoneNumber: '555-555-5555',
        skypeId: 'ConfusedMan', profileUrl: 'http://www.revature.com/confused', recruiterName: 'Edward Hulse',
        college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science', techScreenerName: 'hard to pronounce',
        projectCompletion: 'yes', flagStatus: 'yes', flagNotes: 'none', marketingStatus: 'marketable', client: 'JP Morgan Chase',
        endClient: 'Super Revature', traineeUserInfo: {}};

        const mockTrainee = { traineeId: 1, resourceId: 1, name: 'Confused Userman', email: 'Confused@website.com',
        trainingStatus: 'Beginner', phoneNumber: '555-555-5555', skypeId: 'ConfusedMan', profileUrl: 'http://revature.com/confused',
        recruiterName: 'Edward Hulse', college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science',
        techScreenerName: 'Hard to pronounce', projectCompletion: 'Yes', batch: mockBranch };

        traineeService.delete(mockTrainee).subscribe((myTrainee) => {
          // expect(myTrainee).toEqual(mockTrainee);
        });

        const mockReq = httpMock.expectOne(context.delete(mockTrainee.traineeId));

        mockReq.flush(mockTrainee);

        httpMock.verify();

      }
    )
  );
  it (
    'delete function should return deleted trainee',
    inject(
      [HttpTestingController, TraineeService],
      (
        httpMock: HttpTestingController,
        traineeService: TraineeService
      ) => {


        const mockBranch = {resourceId: 2, trainingName: 'cool kids', trainer: 1, cotrainer: 2, skillType: 'Microservices',
        trainingType: 'Lecture', startDate: new Date('March 5, 2018 08:35:00'), endDate: new Date('May 18, 2018 05:00:00'),
        location: 'USF', curriculum: 'Microservices', skills: 4,
        trainees: [], notes: 'The Good Ones', batchId: 1803};

        const mockHydraTrainee = {traineeId: 1, resourceId: 1, trainingStatus: 'Good', batch: mockBranch, phoneNumber: '555-555-5555',
        skypeId: 'ConfusedMan', profileUrl: 'http://www.revature.com/confused', recruiterName: 'Edward Hulse',
        college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science', techScreenerName: 'hard to pronounce',
        projectCompletion: 'yes', flagStatus: 'yes', flagNotes: 'none', marketingStatus: 'marketable', client: 'JP Morgan Chase',
        endClient: 'Super Revature', traineeUserInfo: {}};

        const mockTrainee = { traineeId: 1, resourceId: 1, name: 'Confused Userman', email: 'Confused@website.com',
        trainingStatus: 'Beginner', phoneNumber: '555-555-5555', skypeId: 'ConfusedMan', profileUrl: 'http://revature.com/confused',
        recruiterName: 'Edward Hulse', college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science',
        techScreenerName: 'Hard to pronounce', projectCompletion: 'Yes', batch: mockBranch };

        traineeService.delete(mockTrainee).subscribe((myTrainee) => {
          expect(myTrainee).toEqual(mockTrainee);
        });

        const mockReq = httpMock.expectOne(context.delete(mockTrainee.traineeId));

        mockReq.flush(mockTrainee);

        httpMock.verify();

      }
    )
  );
  it (
    'should fetch all',
    inject(
      [HttpTestingController, TraineeService],
      (
        httpMock: HttpTestingController,
        traineeService: TraineeService
      ) => {


        const mockBranch = {resourceId: 1, trainingName: 'cool kids', trainer: 1, cotrainer: 2, skillType: 'Microservices',
        trainingType: 'Lecture', startDate: new Date('March 5, 2018 08:35:00'), endDate: new Date('May 18, 2018 05:00:00'),
        location: 'USF', curriculum: 'Microservices', skills: 4,
        trainees: [], notes: 'The Good Ones', batchId: 1803};

        const mockHydraTrainee = {traineeId: 1, resourceId: 1, trainingStatus: 'Good', batch: mockBranch, phoneNumber: '555-555-5555',
        skypeId: 'ConfusedMan', profileUrl: 'http://www.revature.com/confused', recruiterName: 'Edward Hulse',
        college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science', techScreenerName: 'hard to pronounce',
        projectCompletion: 'yes', flagStatus: 'yes', flagNotes: 'none', marketingStatus: 'marketable', client: 'JP Morgan Chase',
        endClient: 'Super Revature', traineeUserInfo: {}};

        const mockTrainees = [{ traineeId: 1, resourceId: 1, name: 'Confused Userman', email: 'Confused@website.com',
        trainingStatus: 'Beginner', phoneNumber: '555-555-5555', skypeId: 'ConfusedMan', profileUrl: 'http://revature.com/confused',
        recruiterName: 'Edward Hulse', college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science',
        techScreenerName: 'Hard to pronounce', projectCompletion: 'Yes', batch: mockBranch }];

        traineeService.fetchAll(1).subscribe((myTrainees) => {
          expect(myTrainees).toEqual(mockTrainees);
        });

        const mockReq = httpMock.expectOne(context.fetchAllByBatch(1));

        mockReq.flush(mockTrainees);

        httpMock.verify();

      }
    )
  );
  it (
    'should fetch all dropped',
    inject(
      [HttpTestingController, TraineeService],
      (
        httpMock: HttpTestingController,
        traineeService: TraineeService
      ) => {


        const mockBranch = {resourceId: 1, trainingName: 'cool kids', trainer: 1, cotrainer: 2, skillType: 'Microservices',
        trainingType: 'Lecture', startDate: new Date('March 5, 2018 08:35:00'), endDate: new Date('May 18, 2018 05:00:00'),
        location: 'USF', curriculum: 'Microservices', skills: 4,
        trainees: [], notes: 'The Good Ones', batchId: 1803};

        const mockHydraTrainee = {traineeId: 1, resourceId: 1, trainingStatus: 'Good', batch: mockBranch, phoneNumber: '555-555-5555',
        skypeId: 'ConfusedMan', profileUrl: 'http://www.revature.com/confused', recruiterName: 'Edward Hulse',
        college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science', techScreenerName: 'hard to pronounce',
        projectCompletion: 'yes', flagStatus: 'yes', flagNotes: 'none', marketingStatus: 'marketable', client: 'JP Morgan Chase',
        endClient: 'Super Revature', traineeUserInfo: {}};

        const mockTrainees = [{ traineeId: 1, resourceId: 1, name: 'Confused Userman', email: 'Confused@website.com',
        trainingStatus: 'Beginner', phoneNumber: '555-555-5555', skypeId: 'ConfusedMan', profileUrl: 'http://revature.com/confused',
        recruiterName: 'Edward Hulse', college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science',
        techScreenerName: 'Hard to pronounce', projectCompletion: 'Yes', batch: mockBranch }];

        traineeService.fetchDroppedByBatch(1).subscribe((myTrainees) => {
          expect(myTrainees).toEqual(mockTrainees);
        });

        const mockReq = httpMock.expectOne(context.fetchDroppedByBatch(1));

        mockReq.flush(mockTrainees);

        httpMock.verify();

      }
    )
  );
  it (
    'should initialize listSubject',
    inject(
      [HttpTestingController, TraineeService],
      (
        httpMock: HttpTestingController,
        traineeService: TraineeService
      ) => {


        const mockBranch = {resourceId: 1, trainingName: 'cool kids', trainer: 1, cotrainer: 2, skillType: 'Microservices',
        trainingType: 'Lecture', startDate: new Date('March 5, 2018 08:35:00'), endDate: new Date('May 18, 2018 05:00:00'),
        location: 'USF', curriculum: 'Microservices', skills: 4,
        trainees: [], notes: 'The Good Ones', batchId: 1803};

        const mockHydraTrainee = {traineeId: 1, resourceId: 1, trainingStatus: 'Good', batch: mockBranch, phoneNumber: '555-555-5555',
        skypeId: 'ConfusedMan', profileUrl: 'http://www.revature.com/confused', recruiterName: 'Edward Hulse',
        college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science', techScreenerName: 'hard to pronounce',
        projectCompletion: 'yes', flagStatus: 'yes', flagNotes: 'none', marketingStatus: 'marketable', client: 'JP Morgan Chase',
        endClient: 'Super Revature', traineeUserInfo: {}};

        const mockTrainees = [{ traineeId: 1, resourceId: 1, name: 'Confused Userman', email: 'Confused@website.com',
        trainingStatus: 'Beginner', phoneNumber: '555-555-5555', skypeId: 'ConfusedMan', profileUrl: 'http://revature.com/confused',
        recruiterName: 'Edward Hulse', college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science',
        techScreenerName: 'Hard to pronounce', projectCompletion: 'Yes', batch: mockBranch }];

        traineeService.fetchAllByBatch(1);

        traineeService.listSubject.asObservable().subscribe((myTrainees) => {
          expect(myTrainees).toEqual(mockTrainees);
        });

        const mockReq = httpMock.expectOne(context.fetchAllByBatch(1));

        mockReq.flush(mockTrainees);

        httpMock.verify();

      }
    )
  );
});
