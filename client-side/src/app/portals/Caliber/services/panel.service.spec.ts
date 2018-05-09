import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { ApiService } from '../util/api.service';
import { PanelService } from './panel.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';
import { HydraTrainee } from '../../../hydra-client/entities/HydraTrainee';
import { User } from '../../../hydra-client/entities/User';

const context = environment.panel;

const mockHydraAddress = {addressId: 1, street: '123 Fake st.', city: 'Springfield', state: 'Unclear', zipcode: '97070',
        company: 'Revature', active: true};

        const mockGambitSkillType = {skillTypeId: 1, skillTypeName: 'Microservices', skillTypeDesc: 'Things about Microservices',
        skills: [], isActive: true, isCore: true };

        const mockTrainerRole = {roleId: 2, role: 'Trainer'};

        const mockTrainer = {userId: 2, firstName: 'Mitch', middleName: 'Unknown', lastName: 'Goshorn', email: 'mitch@revature.com',
        password: 'Long String', backupPassword: 'Longer String', role: mockTrainerRole, mobilePhone: '444-444-4444',
        homePhone: '333-333-3333', token: 'rozencrantz', title: 'Captain'};

        const mockTrainerTwo = {userId: 3, firstName: 'John', middleName: 'Unknown', lastName: 'Smith', email: 'john@revature.com',
        password: 'teh smith', backupPassword: 'the smith', role: mockTrainerRole, mobilePhone: '444-444-4444',
        homePhone: '333-333-3333', token: 'rozencrantz', title: 'Lieutenant'};

        const mockSkillType = {};

        const mockBatch = {batchId: 1803, resourceId: 2, trainingName: 'cool kids', trainer: mockTrainer, cotrainer: mockTrainerTwo,
        skillType: mockGambitSkillType, trainingType: 'Lecture', addressId: 1, address: mockHydraAddress, location: 'Springfield',
        goodGradeThreshold: 90, borderlineGradeThreshold: 80, startDate: new Date('March 5, 2018 08:35:00'),
        endDate: new Date('May 18, 2018 05:00:00'), week: 10, noteIds: [1, 2], trainees: []};

        const mockUserRole = {roleId: 1, role: 'Associate'};

        const mockUser: User = {userId: 1, firstName: 'Confused', middleName: 'ish', lastName: 'Userman', email: 'confused@website.com',
        password: 'hello', backupPassword: 'world', role: mockUserRole, mobilePhone: '555-555-5555', homePhone: '555-555-5555',
        token: 'asghahrgr'};

        const mockHydraTrainee = new HydraTrainee(1, 'Will', 'Joseph', 'Davies', 'wjdavies123@gmail.com', 'hello', 'world',
        mockUserRole, '555-555-5555', '444-444-4444', 'character', 1, 4, 'complete', mockBatch, '444-444-4444', 'wjdavies123',
        'www.revature.com/william', 'Edward Hulse', 'Oregon State University', 'Bachelor of Science', 'Computer Science', 'John', 'yes',
        'patriotic', 'super patriotic', 'very', 'Apple', 'Revature', mockUser);

        const mockPanel = {panelId: 1, trainee: mockHydraTrainee, panelist: 'Jeffery', interviewDate: new Date('March 5, 2018 08:35:00'),
        duration: 'seven', format: 'Interview', internet: 'functional', panelRound: 1, recordingConsent: 'Yes',
        recordingLink: 'record.com/userman', status: 'In Progress', associateIntro: 'Prepare to be amazed',
        projectOneDescription: 'A thing', projectTwoDescription: 'Another Thing', projectThreeDescription: 'A Third Thing',
        communicationSkills: 'Good', overall: 'promising', feedback: ['Blink less', 'I\'m a potato']};


fdescribe('PanelService', () => {
  beforeEach(() => {
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

  it('should be created', inject([PanelService], (service: PanelService) => {
    expect(service).toBeTruthy();
  }));
  it(
    'should return created Panel from create function',
    inject(
      [PanelService, HttpTestingController],
      (
        panelService: PanelService,
        httpMock: HttpTestingController
      ) => {

        panelService.create(mockPanel).subscribe((myPanel) => {
          expect(myPanel).toEqual(mockPanel);
          expect(myPanel.status).toEqual('Pass');
        });

        // mockPanel.status = 'Pass';

        const mockReq = httpMock.expectOne(context.save());

        mockReq.flush(mockPanel);

        httpMock.verify();
  }));
  it(
    'should return updated Panel from update function',
    inject(
      [PanelService, HttpTestingController],
      (
        panelService: PanelService,
        httpMock: HttpTestingController
      ) => {


        panelService.update(mockPanel).subscribe((myPanel) => {
          expect(myPanel).toEqual(mockPanel);
        });

        const mockReq = httpMock.expectOne(context.update());

        mockReq.flush(mockPanel);

        httpMock.verify();
  }));
  it(
    'should return deleted Panel from delete function',
    inject(
      [PanelService, HttpTestingController],
      (
        panelService: PanelService,
        httpMock: HttpTestingController
      ) => {

        panelService.delete(mockPanel).subscribe((myPanel) => {
          expect(myPanel).toEqual(mockPanel);
        });

        const mockReq = httpMock.expectOne(context.delete(mockPanel.panelId));

        mockReq.flush(mockPanel);

        httpMock.verify();
  }));
  it(
    'should return Panel clone that is different from original from prepareForApi function',
    inject(
      [PanelService, HttpTestingController, ApiService],
      (
        panelService: PanelService,
        httpMock: HttpTestingController,
        apiService: ApiService
      ) => {


        const changedPanel = panelService['prepareForApi'](mockPanel);

        expect(changedPanel).not.toEqual(mockPanel);
        // expect(changedPanel.interviewDate).not.toEqual(mockPanel.interviewDate);
        // expect(changedPanel.interviewDate).toEqual(apiService.stringifyDate(mockPanel.interviewDate));
  }));
  it(
    'should return Panel clone with different value for interviewDate but same for others from prepareForApi function',
    inject(
      [PanelService, HttpTestingController, ApiService],
      (
        panelService: PanelService,
        httpMock: HttpTestingController,
        apiService: ApiService
      ) => {

        const changedPanel = panelService['prepareForApi'](mockPanel);

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
  it(
    'should return Panel clone with stringified value of original panel\'s interviewDate as its interviewDate from prepareForApi function',
    inject(
      [PanelService, HttpTestingController, ApiService],
      (
        panelService: PanelService,
        httpMock: HttpTestingController,
        apiService: ApiService
      ) => {

        const changedPanel = panelService['prepareForApi'](mockPanel);

        // expect(changedPanel).not.toEqual(mockPanel);
        // expect(changedPanel.interviewDate).not.toEqual(mockPanel.interviewDate);
        expect(changedPanel.interviewDate).toEqual(apiService.stringifyDate(mockPanel.interviewDate));
  }));
  xit(
    'should fetch all with fetchAll function',
    inject(
      [PanelService, HttpTestingController],
      (
        panelService: PanelService,
        httpMock: HttpTestingController
      ) => {


        const mockPanels = [ mockPanel ];
        panelService.fetchAll().subscribe((myPanels) => {
          expect(myPanels).toEqual(mockPanels);
        });

        const mockReq = httpMock.expectOne(context.fetchAll());

        mockReq.flush(mockPanels);

        httpMock.verify();
  }));
  xit(
    'should fetch all with trainee using fetchAllByTrainee function',
    inject(
      [PanelService, HttpTestingController],
      (
        panelService: PanelService,
        httpMock: HttpTestingController
      ) => {


        const mockPanels = [mockPanel];
        panelService.fetchAllByTrainee(mockHydraTrainee).subscribe((myPanels) => {
          expect(myPanels).toEqual(mockPanels);
        });

        const mockReq = httpMock.expectOne(context.fetchAllByTrainee(mockHydraTrainee.traineeId));

        mockReq.flush(mockPanels);

        httpMock.verify();
  }));
});
