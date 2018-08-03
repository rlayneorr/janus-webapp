import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { BatchDetailsComponent } from './batch-details.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomeComponent } from '../home/home.component';
import { FooterComponent } from '../footer/footer/footer.component';

import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { BatchService } from '../../services/batch-service/batch.service';
import { AssociateService } from '../../services/associates-service/associates-service';

import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { Batch } from '../../models/batch.model';
import { User } from '../../models/user.model';
import { Associate } from '../../models/associate.model';

import { OrderByPipe } from '../../../Caliber/pipes/order-by.pipe'; // this doesn't seem quite right ...
import { HttpClient } from '@angular/common/http';
import { UrlService } from '../../../../gambit-client/services/urls/url.service';


describe('BatchDetailsComponent', () => {
    let component: BatchDetailsComponent;
    let fixture: ComponentFixture<BatchDetailsComponent>;
    const testBatchService: BatchService = new BatchService(null);
    const testAuthService: AuthenticationService = new AuthenticationService(null, null, null);
    const testAssocService: AssociateService = new AssociateService(null, null);

    // setup service mocks
    beforeAll(() => {
        const batch1: Batch = new Batch();
        batch1.batchName = 'Test-Curriculum-1';
        const batch2: Batch = new Batch();
        batch2.batchName = 'Test-Curriculum-2';
        // mock batch service
        spyOn(testBatchService, 'getDefaultBatches').and.returnValue(Observable.of([batch1]));
        spyOn(testBatchService, 'getBatchesByDate').and.returnValue(Observable.of([batch1, batch2]));

        const assoc: Associate = new Associate();
        spyOn(testAssocService, 'getAssociatesByBatch').and.returnValue(Observable.of([assoc]));

        const user: User = new User();
        user.token = 'mockToken';
        user.username = 'mockUser';
        user.tfRoleId = 1;
        spyOn(testAuthService, 'getUser').and.returnValue(user);  // needed by navbar
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BatchDetailsComponent,
                NavbarComponent,
                FooterComponent,
                OrderByPipe,
                HomeComponent
            ],
            providers: [
                { provide: AuthenticationService, useValue: testAuthService },
                { provide: BatchService, useValue: testBatchService },
                { provide: AssociateService, useValue: testAssocService } // inject service
            ],
            imports: [
                RouterTestingModule,
                FormsModule,
                ChartsModule
            ]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BatchDetailsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should contain associates if loaded', () => {
        if (component.isDataReady && !component.isDataEmpty) {
            expect(component.associates).toBeTruthy();
        }
    });

});
