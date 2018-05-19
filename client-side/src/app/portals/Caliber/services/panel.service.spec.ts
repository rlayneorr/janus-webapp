import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { ApiService } from '../util/api.service';
import { PanelService } from './panel.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { HydraTrainee } from '../../../gambit-client/entities/HydraTrainee';
import { User } from '../../../gambit-client/entities/User';

const context = environment.panel;  // base of the url is at environment.panel

// A HydraAddress is needed for a batch
const mockHydraAddress = {addressId: 1, street: '123 Fake st.', city: 'Springfield', state: 'Unclear', zipcode: '97070',
      company: 'Revature', active: true};

// A GambitSkillType is needed for a Batch
const mockGambitSkillType = {skillTypeId: 1, skillTypeName: 'Microservices', skillTypeDesc: 'Things about Microservices',
        skills: [], isActive: true, isCore: true };

// A TrainerRole is needed for a trainer
const mockTrainerRole = {roleId: 2, role: 'Trainer'};

// A trainer is needed for a Batch
const mockTrainer = {userId: 2, firstName: 'Mitch', middleName: 'Unknown', lastName: 'Goshorn', email: 'mitch@revature.com',
      password: 'Long String', backupPassword: 'Longer String', role: mockTrainerRole, mobilePhone: '444-444-4444',
      homePhone: '333-333-3333', token: 'rozencrantz', title: 'Captain'};

// Another trainer is needed for a Batch
const mockTrainerTwo = {userId: 3, firstName: 'John', middleName: 'Unknown', lastName: 'Smith', email: 'john@revature.com',
      password: 'teh smith', backupPassword: 'the smith', role: mockTrainerRole, mobilePhone: '444-444-4444',
      homePhone: '333-333-3333', token: 'rozencrantz', title: 'Lieutenant'};

// A Batch is needed for a HydraTrainee
const mockBatch = {batchId: 1803, resourceId: 2, trainingName: 'cool kids', trainer: mockTrainer, cotrainer: mockTrainerTwo,
      skillType: mockGambitSkillType, trainingType: 'Lecture', addressId: 1, address: mockHydraAddress, location: 'Springfield',
      goodGradeThreshold: 90, borderlineGradeThreshold: 80, startDate: new Date('March 5, 2018 08:35:00'),
      endDate: new Date('May 18, 2018 05:00:00'), week: 10, noteIds: [1, 2], trainees: []};

// A UserRole is needed for a User
const mockUserRole = {roleId: 1, role: 'Associate'};

// A User is needed for a mockTrainee
const mockUser: User = {userId: 1, firstName: 'Confused', middleName: 'ish', lastName: 'Userman', email: 'confused@website.com',
      password: 'hello', backupPassword: 'world', role: mockUserRole, mobilePhone: '555-555-5555', homePhone: '555-555-5555',
      token: 'asghahrgr'};

// A HydraTrainee is needed for a panel
const mockHydraTrainee = new HydraTrainee(1, 'Will', 'Joseph', 'Davies', 'wjdavies123@gmail.com', 'hello', 'world',
      mockUserRole, '555-555-5555', '444-444-4444', 'character', 1, 4, 'complete', mockBatch, '444-444-4444', 'wjdavies123',
      'www.revature.com/william', 'Edward Hulse', 'Oregon State University', 'Bachelor of Science', 'Computer Science', 'John', 'yes',
      'patriotic', 'super patriotic', 'very', 'Apple', 'Revature', mockUser);

// A mock panel is needed for each test
const mockPanel = {panelId: 1, trainee: mockHydraTrainee, panelist: 'Jeffery', interviewDate: new Date('March 5, 2018 08:35:00'),
      duration: 'seven', format: 'Interview', internet: 'functional', panelRound: 1, recordingConsent: 'Yes',
      recordingLink: 'record.com/userman', status: 'In Progress', associateIntro: 'Prepare to be amazed',
      projectOneDescription: 'A thing', projectTwoDescription: 'Another Thing', projectThreeDescription: 'A Third Thing',
      communicationSkills: 'Good', overall: 'promising', feedback: ['Blink less', 'I\'m a potato']};



xdescribe('PanelService', () => {
  beforeEach(() => {                      // Before each test, enumerate modules under imports and services under providers
    TestBed.configureTestingModule({
      imports: [ HttpClientModule,
        HttpClientTestingModule
      ],
      providers: [
        PanelService,
        ApiService,
        HttpClient
      ]
    });
  });

  it('should be created', inject([PanelService], (service: PanelService) => { // Ensure the service can be created
    expect(service).toBeTruthy();
  }));
  it(
    'should return created Panel from create function',                       // Test create function
    inject(
      [PanelService, HttpTestingController],                                  // Inject needed services, including the testing controller
      (
        panelService: PanelService,
        httpMock: HttpTestingController
      ) => {

        panelService.create(mockPanel).subscribe((myPanel) => {              // Use the function
          expect(myPanel).toEqual(mockPanel);                                // expect value returned from the function to equal mockPanel
          expect(myPanel.status).toEqual('Pass');                            // expect the status of the returned object to be 'Pass'
        });

        const mockReq = httpMock.expectOne(context.save());                  // initialize mock request to expect request to context.save

        mockReq.flush(mockPanel);                                            // make testing controller return mockPanel

        httpMock.verify();                                                   // verify there are no more requests
  }));
  it(
    'should return updated Panel from update function',                      // test update function
    inject(                                                                  // Inject needed services
      [PanelService, HttpTestingController],
      (
        panelService: PanelService,
        httpMock: HttpTestingController
      ) => {


        panelService.update(mockPanel).subscribe((myPanel) => {              // Call the function
          expect(myPanel).toEqual(mockPanel);                                // Expect the returned value to equal what was sent in
        });

        const mockReq = httpMock.expectOne(context.update());                // Initialize mock request to expect request to context.update

        mockReq.flush(mockPanel);                                            // Make the mock request return mock Panel as the response

        httpMock.verify();                                                   // Verify there are no more requests
  }));
  it(
    'should return deleted Panel from delete function',                      // test delete function
    inject(                                                                  // The service and the HttpTestingController are needed
      [PanelService, HttpTestingController],
      (
        panelService: PanelService,
        httpMock: HttpTestingController
      ) => {

        panelService.delete(mockPanel).subscribe((myPanel) => {              // Call the delete function
          expect(myPanel).toEqual(mockPanel);                                // The object returned should equal what was passed in
        });

        const mockReq = httpMock.expectOne(context.delete(mockPanel.panelId));  // initialize mock request to expect at appropriate endpoint

        mockReq.flush(mockPanel);                                            // mock request returns the panel

        httpMock.verify();
  }));
  it(
    'should return Panel clone that is different from original from prepareForApi function', // ensure prepareForApi returns different obj
    inject(                                                                                  // Inject needed services
      [PanelService, HttpTestingController, ApiService],
      (
        panelService: PanelService,
        httpMock: HttpTestingController,
        apiService: ApiService
      ) => {


        const changedPanel = panelService['prepareForApi'](mockPanel);            // Use function and get returned object

        expect(changedPanel).not.toEqual(mockPanel);                              // Expect the returned object to be differant
  }));
  it(                                                                             // Ensure returned object is different in the right way
    'should return Panel clone with different value for interviewDate but same for others from prepareForApi function',
    inject(                                                                       // Inject the needed services
      [PanelService, HttpTestingController, ApiService],
      (
        panelService: PanelService,
        httpMock: HttpTestingController,
        apiService: ApiService
      ) => {

        const changedPanel = panelService['prepareForApi'](mockPanel);            // Use function, get returned object

        // All values should be the same except interviewDate, which should be different
        expect(changedPanel.panelId).toEqual(mockPanel.panelId);
        expect(changedPanel.trainee).toEqual(mockPanel.trainee);
        expect(changedPanel.panelist).toEqual(mockPanel.panelist);
        expect(changedPanel.interviewDate).not.toEqual(mockPanel.interviewDate);
        expect(changedPanel.duration).toEqual(mockPanel.duration);
        expect(changedPanel.format).toEqual(mockPanel.format);
        expect(changedPanel.internet).toEqual(mockPanel.internet);
        expect(changedPanel.panelRound).toEqual(mockPanel.panelRound);
        expect(changedPanel.recordingConsent).toEqual(mockPanel.recordingConsent);
        expect(changedPanel.recordingLink).toEqual(mockPanel.recordingLink);
        expect(changedPanel.status).toEqual(mockPanel.status);
        expect(changedPanel.associateIntro).toEqual(mockPanel.associateIntro);
        expect(changedPanel.projectOneDescription).toEqual(mockPanel.projectOneDescription);
        expect(changedPanel.projectTwoDescription).toEqual(mockPanel.projectTwoDescription);
        expect(changedPanel.projectThreeDescription).toEqual(mockPanel.projectThreeDescription);
        expect(changedPanel.communicationSkills).toEqual(mockPanel.communicationSkills);
        expect(changedPanel.overall).toEqual(mockPanel.overall);
        expect(changedPanel.feedback).toEqual(mockPanel.feedback);
  }));
  it(                                                                                 // Ensure returned object is a stringified date
    'should return Panel clone with stringified value of original panel\'s interviewDate as its interviewDate from prepareForApi function',
    inject(                                                                           // inject needed services
      [PanelService, HttpTestingController, ApiService],
      (
        panelService: PanelService,
        httpMock: HttpTestingController,
        apiService: ApiService
      ) => {

        const changedPanel = panelService['prepareForApi'](mockPanel);                // Use the function, get the returned object

        // interviewDate of changed object should equal stringified version of value from original object
        expect(changedPanel.interviewDate).toEqual(apiService.stringifyDate(mockPanel.interviewDate));
  }));
  xit(  // test fetchAll
    'should fetch all with fetchAll function',
    inject(
      [PanelService, HttpTestingController],
      (
        panelService: PanelService,
        httpMock: HttpTestingController
      ) => {


        const mockPanels = [ mockPanel ];                           // Make the array of mockPanels
        panelService.fetchAll().subscribe((myPanels) => {           // Call the function
          expect(myPanels).toEqual(mockPanels);                     // Expect returned array to equal the array flushed through
        });

        const mockReq = httpMock.expectOne(context.fetchAll());    // Initialize mock request to expect request at certain endpoing

        mockReq.flush(mockPanels);                                 // mockPanels should be in the response

        httpMock.verify();                                         // verify there are no more requests
  }));
  xit(
    'should fetch all with trainee using fetchAllByTrainee function',
    inject(
      [PanelService, HttpTestingController],
      (
        panelService: PanelService,
        httpMock: HttpTestingController
      ) => {


        const mockPanels = [mockPanel];                                             // Array to be returned in mock response
        panelService.fetchAllByTrainee(mockHydraTrainee).subscribe((myPanels) => {  // Use function
          expect(myPanels).toEqual(mockPanels);                                     // expect returned value to be the value flushed through
        });

        const mockReq = httpMock.expectOne(context.fetchAllByTrainee(mockHydraTrainee.traineeId)); // initialize mock request

        mockReq.flush(mockPanels);                                                  // mockPanels should be the array returned be response

        httpMock.verify();                                                          // verify there are no more requests
  }));
});
