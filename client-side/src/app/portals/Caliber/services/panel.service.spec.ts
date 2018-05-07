import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule, HttpClient} from '@angular/common/http';
import { ApiService } from '../util/api.service';
import { PanelService } from './panel.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../../environments/environment';

const context = environment.panel;

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

        const mockBatch = {resourceId: 2, trainingName: 'cool kids', trainer: 1, cotrainer: 2, skillType: 'Microservices',
        trainingType: 'Lecture', startDate: new Date('March 5, 2018 08:35:00'), endDate: new Date('May 18, 2018 05:00:00'),
        location: 'USF', curriculum: 'Microservices', skills: 4,
        trainees: [], notes: 'The Good Ones', batchId: 1803};

        const mockUserRole = {roleId: 1, role: 'Associate'};

        const mockUser = {userId: 1, firstName: 'Confused', middleName: 'ish', lastName: 'Userman', email: 'confused@website.com',
        password: 'hello', backupPassword: 'world', role: mockUserRole, mobilePhone: '555-555-5555', homePhone: '555-555-5555',
        token: 'asghahrgr'};

        const mockHydraTrainee = {traineeId: 1, resourceId: 1, trainingStatus: 'Good', batch: mockBatch, phoneNumber: '555-555-5555',
        skypeId: 'ConfusedMan', profileUrl: 'http://www.revature.com/confused', recruiterName: 'Edward Hulse',
        college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science', techScreenerName: 'hard to pronounce',
        projectCompletion: 'yes', flagStatus: 'yes', flagNotes: 'none', marketingStatus: 'marketable', client: 'JP Morgan Chase',
        endClient: 'Super Revature', traineeUserInfo: mockUser};

        const mockPanel = {panelId: 1, trainee: mockHydraTrainee, panelist: 'Jeffery', interviewDate: new Date('March 5, 2018 08:35:00'),
        duration: 'seven', format: 'Interview', internet: 'functional', panelRound: 1, recordingConsent: 'Yes',
        recordingLink: 'record.com/userman', status: 'In Progress', associateIntro: 'Prepare to be amazed',
        projectOneDescription: 'A thing', projectTwoDescription: 'Another Thing', projectThreeDescription: 'A Third Thing',
        communicationSkills: 'Good', overall: 'promising', feedback: ['Blink less', 'I\'m a potato']};

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

        const mockBatch = {resourceId: 2, trainingName: 'cool kids', trainer: 1, cotrainer: 2, skillType: 'Microservices',
        trainingType: 'Lecture', startDate: new Date('March 5, 2018 08:35:00'), endDate: new Date('May 18, 2018 05:00:00'),
        location: 'USF', curriculum: 'Microservices', skills: 4,
        trainees: [], notes: 'The Good Ones', batchId: 1803};

        const mockUserRole = {roleId: 1, role: 'Associate'};

        const mockUser = {userId: 1, firstName: 'Confused', middleName: 'ish', lastName: 'Userman', email: 'confused@website.com',
        password: 'hello', backupPassword: 'world', role: mockUserRole, mobilePhone: '555-555-5555', homePhone: '555-555-5555',
        token: 'asghahrgr'};

        const mockHydraTrainee = {traineeId: 1, resourceId: 1, trainingStatus: 'Good', batch: mockBatch, phoneNumber: '555-555-5555',
        skypeId: 'ConfusedMan', profileUrl: 'http://www.revature.com/confused', recruiterName: 'Edward Hulse',
        college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science', techScreenerName: 'hard to pronounce',
        projectCompletion: 'yes', flagStatus: 'yes', flagNotes: 'none', marketingStatus: 'marketable', client: 'JP Morgan Chase',
        endClient: 'Super Revature', traineeUserInfo: mockUser};

        const mockPanel = {panelId: 1, trainee: mockHydraTrainee, panelist: 'Jeffery', interviewDate: new Date('March 5, 2018 08:35:00'),
        duration: 'seven', format: 'Interview', internet: 'functional', panelRound: 1, recordingConsent: 'Yes',
        recordingLink: 'record.com/userman', status: 'In Progress', associateIntro: 'Prepare to be amazed',
        projectOneDescription: 'A thing', projectTwoDescription: 'Another Thing', projectThreeDescription: 'A Third Thing',
        communicationSkills: 'Good', overall: 'promising', feedback: ['Blink less', 'I\'m a potato']};

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

        const mockBatch = {resourceId: 2, trainingName: 'cool kids', trainer: 1, cotrainer: 2, skillType: 'Microservices',
        trainingType: 'Lecture', startDate: new Date('March 5, 2018 08:35:00'), endDate: new Date('May 18, 2018 05:00:00'),
        location: 'USF', curriculum: 'Microservices', skills: 4,
        trainees: [], notes: 'The Good Ones', batchId: 1803};

        const mockUserRole = {roleId: 1, role: 'Associate'};

        const mockUser = {userId: 1, firstName: 'Confused', middleName: 'ish', lastName: 'Userman', email: 'confused@website.com',
        password: 'hello', backupPassword: 'world', role: mockUserRole, mobilePhone: '555-555-5555', homePhone: '555-555-5555',
        token: 'asghahrgr'};

        const mockHydraTrainee = {traineeId: 1, resourceId: 1, trainingStatus: 'Good', batch: mockBatch, phoneNumber: '555-555-5555',
        skypeId: 'ConfusedMan', profileUrl: 'http://www.revature.com/confused', recruiterName: 'Edward Hulse',
        college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science', techScreenerName: 'hard to pronounce',
        projectCompletion: 'yes', flagStatus: 'yes', flagNotes: 'none', marketingStatus: 'marketable', client: 'JP Morgan Chase',
        endClient: 'Super Revature', traineeUserInfo: mockUser};

        const mockPanel = {panelId: 1, trainee: mockHydraTrainee, panelist: 'Jeffery', interviewDate: new Date('March 5, 2018 08:35:00'),
        duration: 'seven', format: 'Interview', internet: 'functional', panelRound: 1, recordingConsent: 'Yes',
        recordingLink: 'record.com/userman', status: 'In Progress', associateIntro: 'Prepare to be amazed',
        projectOneDescription: 'A thing', projectTwoDescription: 'Another Thing', projectThreeDescription: 'A Third Thing',
        communicationSkills: 'Good', overall: 'promising', feedback: ['Blink less', 'I\'m a potato']};

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

        const mockBatch = {resourceId: 2, trainingName: 'cool kids', trainer: 1, cotrainer: 2, skillType: 'Microservices',
        trainingType: 'Lecture', startDate: new Date('March 5, 2018 08:35:00'), endDate: new Date('May 18, 2018 05:00:00'),
        location: 'USF', curriculum: 'Microservices', skills: 4,
        trainees: [], notes: 'The Good Ones', batchId: 1803};

        const mockUserRole = {roleId: 1, role: 'Associate'};

        const mockUser = {userId: 1, firstName: 'Confused', middleName: 'ish', lastName: 'Userman', email: 'confused@website.com',
        password: 'hello', backupPassword: 'world', role: mockUserRole, mobilePhone: '555-555-5555', homePhone: '555-555-5555',
        token: 'asghahrgr'};

        const mockHydraTrainee = {traineeId: 1, resourceId: 1, trainingStatus: 'Good', batch: mockBatch, phoneNumber: '555-555-5555',
        skypeId: 'ConfusedMan', profileUrl: 'http://www.revature.com/confused', recruiterName: 'Edward Hulse',
        college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science', techScreenerName: 'hard to pronounce',
        projectCompletion: 'yes', flagStatus: 'yes', flagNotes: 'none', marketingStatus: 'marketable', client: 'JP Morgan Chase',
        endClient: 'Super Revature', traineeUserInfo: mockUser};

        const mockPanel = {panelId: 1, trainee: mockHydraTrainee, panelist: 'Jeffery', interviewDate: new Date('March 5, 2018 08:35:00'),
        duration: 'seven', format: 'Interview', internet: 'functional', panelRound: 1, recordingConsent: 'Yes',
        recordingLink: 'record.com/userman', status: 'In Progress', associateIntro: 'Prepare to be amazed',
        projectOneDescription: 'A thing', projectTwoDescription: 'Another Thing', projectThreeDescription: 'A Third Thing',
        communicationSkills: 'Good', overall: 'promising', feedback: ['Blink less', 'I\'m a potato']};

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

        const mockBatch = {resourceId: 2, trainingName: 'cool kids', trainer: 1, cotrainer: 2, skillType: 'Microservices',
        trainingType: 'Lecture', startDate: new Date('March 5, 2018 08:35:00'), endDate: new Date('May 18, 2018 05:00:00'),
        location: 'USF', curriculum: 'Microservices', skills: 4,
        trainees: [], notes: 'The Good Ones', batchId: 1803};

        const mockUserRole = {roleId: 1, role: 'Associate'};

        const mockUser = {userId: 1, firstName: 'Confused', middleName: 'ish', lastName: 'Userman', email: 'confused@website.com',
        password: 'hello', backupPassword: 'world', role: mockUserRole, mobilePhone: '555-555-5555', homePhone: '555-555-5555',
        token: 'asghahrgr'};

        const mockHydraTrainee = {traineeId: 1, resourceId: 1, trainingStatus: 'Good', batch: mockBatch, phoneNumber: '555-555-5555',
        skypeId: 'ConfusedMan', profileUrl: 'http://www.revature.com/confused', recruiterName: 'Edward Hulse',
        college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science', techScreenerName: 'hard to pronounce',
        projectCompletion: 'yes', flagStatus: 'yes', flagNotes: 'none', marketingStatus: 'marketable', client: 'JP Morgan Chase',
        endClient: 'Super Revature', traineeUserInfo: mockUser};

        const mockPanel = {panelId: 1, trainee: mockHydraTrainee, panelist: 'Jeffery', interviewDate: new Date('March 5, 2018 08:35:00'),
        duration: 'seven', format: 'Interview', internet: 'functional', panelRound: 1, recordingConsent: 'Yes',
        recordingLink: 'record.com/userman', status: 'In Progress', associateIntro: 'Prepare to be amazed',
        projectOneDescription: 'A thing', projectTwoDescription: 'Another Thing', projectThreeDescription: 'A Third Thing',
        communicationSkills: 'Good', overall: 'promising', feedback: ['Blink less', 'I\'m a potato']};

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

        const mockBatch = {resourceId: 2, trainingName: 'cool kids', trainer: 1, cotrainer: 2, skillType: 'Microservices',
        trainingType: 'Lecture', startDate: new Date('March 5, 2018 08:35:00'), endDate: new Date('May 18, 2018 05:00:00'),
        location: 'USF', curriculum: 'Microservices', skills: 4,
        trainees: [], notes: 'The Good Ones', batchId: 1803};

        const mockUserRole = {roleId: 1, role: 'Associate'};

        const mockUser = {userId: 1, firstName: 'Confused', middleName: 'ish', lastName: 'Userman', email: 'confused@website.com',
        password: 'hello', backupPassword: 'world', role: mockUserRole, mobilePhone: '555-555-5555', homePhone: '555-555-5555',
        token: 'asghahrgr'};

        const mockHydraTrainee = {traineeId: 1, resourceId: 1, trainingStatus: 'Good', batch: mockBatch, phoneNumber: '555-555-5555',
        skypeId: 'ConfusedMan', profileUrl: 'http://www.revature.com/confused', recruiterName: 'Edward Hulse',
        college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science', techScreenerName: 'hard to pronounce',
        projectCompletion: 'yes', flagStatus: 'yes', flagNotes: 'none', marketingStatus: 'marketable', client: 'JP Morgan Chase',
        endClient: 'Super Revature', traineeUserInfo: mockUser};

        const mockPanel = {panelId: 1, trainee: mockHydraTrainee, panelist: 'Jeffery', interviewDate: new Date('March 5, 2018 08:35:00'),
        duration: 'seven', format: 'Interview', internet: 'functional', panelRound: 1, recordingConsent: 'Yes',
        recordingLink: 'record.com/userman', status: 'In Progress', associateIntro: 'Prepare to be amazed',
        projectOneDescription: 'A thing', projectTwoDescription: 'Another Thing', projectThreeDescription: 'A Third Thing',
        communicationSkills: 'Good', overall: 'promising', feedback: ['Blink less', 'I\'m a potato']};

        const changedPanel = panelService['prepareForApi'](mockPanel);

        // expect(changedPanel).not.toEqual(mockPanel);
        // expect(changedPanel.interviewDate).not.toEqual(mockPanel.interviewDate);
        expect(changedPanel.interviewDate).toEqual(apiService.stringifyDate(mockPanel.interviewDate));
  }));
  it(
    'should fetch all with fetchAll function',
    inject(
      [PanelService, HttpTestingController],
      (
        panelService: PanelService,
        httpMock: HttpTestingController
      ) => {

        const mockBatch = {resourceId: 2, trainingName: 'cool kids', trainer: 1, cotrainer: 2, skillType: 'Microservices',
        trainingType: 'Lecture', startDate: new Date('March 5, 2018 08:35:00'), endDate: new Date('May 18, 2018 05:00:00'),
        location: 'USF', curriculum: 'Microservices', skills: 4,
        trainees: [], notes: 'The Good Ones', batchId: 1803};

        const mockUserRole = {roleId: 1, role: 'Associate'};

        const mockUser = {userId: 1, firstName: 'Confused', middleName: 'ish', lastName: 'Userman', email: 'confused@website.com',
        password: 'hello', backupPassword: 'world', role: mockUserRole, mobilePhone: '555-555-5555', homePhone: '555-555-5555',
        token: 'asghahrgr'};

        const mockHydraTrainee = {traineeId: 1, resourceId: 1, trainingStatus: 'Good', batch: mockBatch, phoneNumber: '555-555-5555',
        skypeId: 'ConfusedMan', profileUrl: 'http://www.revature.com/confused', recruiterName: 'Edward Hulse',
        college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science', techScreenerName: 'hard to pronounce',
        projectCompletion: 'yes', flagStatus: 'yes', flagNotes: 'none', marketingStatus: 'marketable', client: 'JP Morgan Chase',
        endClient: 'Super Revature', traineeUserInfo: mockUser};

        const mockPanels = [ {panelId: 1, trainee: mockHydraTrainee, panelist: 'Jeffery', interviewDate: new Date('March 5, 2018 08:35:00'),
        duration: 'seven', format: 'Interview', internet: 'functional', panelRound: 1, recordingConsent: 'Yes',
        recordingLink: 'record.com/userman', status: 'In Progress', associateIntro: 'Prepare to be amazed',
        projectOneDescription: 'A thing', projectTwoDescription: 'Another Thing', projectThreeDescription: 'A Third Thing',
        communicationSkills: 'Good', overall: 'promising', feedback: ['Blink less', 'I\'m a potato']},
        {panelId: 2, trainee: mockHydraTrainee, panelist: 'Paul', interviewDate: new Date('March 5, 2018 08:35:00'),
        duration: 'seven', format: 'Interview', internet: 'functional', panelRound: 1, recordingConsent: 'Yes',
        recordingLink: 'record.com/userman', status: 'In Progress', associateIntro: 'Prepare to be amazed',
        projectOneDescription: 'A thing', projectTwoDescription: 'Another Thing', projectThreeDescription: 'A Third Thing',
        communicationSkills: 'Good', overall: 'promising', feedback: ['Blink less', 'I\'m a potato']} ];

        panelService.fetchAll().subscribe((myPanels) => {
          expect(myPanels).toEqual(mockPanels);
        });

        const mockReq = httpMock.expectOne(context.fetchAll());

        mockReq.flush(mockPanels);

        httpMock.verify();
  }));
  it(
    'should fetch all with fetchAll function',
    inject(
      [PanelService, HttpTestingController],
      (
        panelService: PanelService,
        httpMock: HttpTestingController
      ) => {

        const mockBatch = {resourceId: 2, trainingName: 'cool kids', trainer: 1, cotrainer: 2, skillType: 'Microservices',
        trainingType: 'Lecture', startDate: new Date('March 5, 2018 08:35:00'), endDate: new Date('May 18, 2018 05:00:00'),
        location: 'USF', curriculum: 'Microservices', skills: 4,
        trainees: [], notes: 'The Good Ones', batchId: 1803};

        const mockUserRole = {roleId: 1, role: 'Associate'};

        const mockUser = {userId: 1, firstName: 'Confused', middleName: 'ish', lastName: 'Userman', email: 'confused@website.com',
        password: 'hello', backupPassword: 'world', role: mockUserRole, mobilePhone: '555-555-5555', homePhone: '555-555-5555',
        token: 'asghahrgr'};

        const mockHydraTrainee = {traineeId: 1, resourceId: 1, trainingStatus: 'Good', batch: mockBatch, phoneNumber: '555-555-5555',
        skypeId: 'ConfusedMan', profileUrl: 'http://www.revature.com/confused', recruiterName: 'Edward Hulse',
        college: 'University of Place', degree: 'Bachelor of Science', major: 'Computer Science', techScreenerName: 'hard to pronounce',
        projectCompletion: 'yes', flagStatus: 'yes', flagNotes: 'none', marketingStatus: 'marketable', client: 'JP Morgan Chase',
        endClient: 'Super Revature', traineeUserInfo: mockUser};

        const mockPanels = [ {panelId: 1, trainee: mockHydraTrainee, panelist: 'Jeffery', interviewDate: new Date('March 5, 2018 08:35:00'),
        duration: 'seven', format: 'Interview', internet: 'functional', panelRound: 1, recordingConsent: 'Yes',
        recordingLink: 'record.com/userman', status: 'In Progress', associateIntro: 'Prepare to be amazed',
        projectOneDescription: 'A thing', projectTwoDescription: 'Another Thing', projectThreeDescription: 'A Third Thing',
        communicationSkills: 'Good', overall: 'promising', feedback: ['Blink less', 'I\'m a potato']},
        {panelId: 2, trainee: mockHydraTrainee, panelist: 'Paul', interviewDate: new Date('March 5, 2018 08:35:00'),
        duration: 'seven', format: 'Interview', internet: 'functional', panelRound: 1, recordingConsent: 'Yes',
        recordingLink: 'record.com/userman', status: 'In Progress', associateIntro: 'Prepare to be amazed',
        projectOneDescription: 'A thing', projectTwoDescription: 'Another Thing', projectThreeDescription: 'A Third Thing',
        communicationSkills: 'Good', overall: 'promising', feedback: ['Blink less', 'I\'m a potato']} ];

        panelService.fetchAllByTrainee(mockHydraTrainee).subscribe((myPanels) => {
          expect(myPanels).toEqual(mockPanels);
        });

        const mockReq = httpMock.expectOne(context.fetchAllByTrainee(mockHydraTrainee.traineeId));

        mockReq.flush(mockPanels);

        httpMock.verify();
  }));
});
