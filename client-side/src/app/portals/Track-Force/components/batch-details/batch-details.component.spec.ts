import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';

import { BatchDetailsComponent } from './batch-details.component';
import { NavbarComponent } from '../navbar/navbar.component';
import { HomeComponent } from '../home/home.component';

import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { BatchService } from '../../services/batch-service/batch.service';

import { RouterTestingModule } from '@angular/router/testing';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { ChartsModule } from 'ng2-charts/ng2-charts';

import { Batch } from '../../models/batch.model';
import { User } from '../../models/user.model';

import { AssociateListComponent } from '../associate-list/associate-list.component';
import { LoginComponent } from '../login/login.component';
import { CreateUserComponent } from '../create-user/create-user.component';
import { SearchFilterPipe } from '../../pipes/search-filter/search-filter.pipe';
import { AssociateSearchByTextFilter } from '../../pipes/associate-search-by-text-filter/associate-search-by-text-filter.pipes';
import { RootComponent } from '../root/root.component';
import { FormComponent } from '../form-component/form.component';
import { SkillsetComponent } from '../skillset/skillset.component';
import { RequestService } from '../../services/request-service/request.service';

import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { OrderByPipe } from '../../../Caliber/pipes/order-by.pipe'; // this doesn't seem quite right ...
import { FooterComponent } from '../footer/footer/footer.component';
import { Associate } from '../../models/associate.model';


describe('BatchDetailsComponent', () => {
    let component: BatchDetailsComponent;
    let fixture: ComponentFixture<BatchDetailsComponent>;
    const testBatchService: BatchService = new BatchService(null);
    const testAuthService: AuthenticationService = new AuthenticationService(null, null);

    // setup service mocks
    beforeAll(() => {
        const batch1: Batch = new Batch();
        batch1.curriculumName = 'Test-Curriculum-1';
        const batch2: Batch = new Batch();
        batch2.curriculumName = 'Test-Curriculum-2';
        // mock batch service
        spyOn(testBatchService, 'getDefaultBatches').and.returnValue(Observable.of([batch1]));
        spyOn(testBatchService, 'getBatchesByDate').and.returnValue(Observable.of([batch1, batch2]));

        const assoc: Associate = new Associate();
        spyOn(testBatchService, 'getAssociatesForBatch').and.returnValue(Observable.of([assoc]));

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
                HomeComponent,
                // AssociateListComponent,
                // LoginComponent,
                CreateUserComponent,
                SearchFilterPipe,
                AssociateSearchByTextFilter,
                RootComponent,
                FormComponent,
                SkillsetComponent
            ],
            providers: [
                RequestService,
                { provide: AuthenticationService, useValue: testAuthService },
                { provide: BatchService, useValue: testBatchService },  // inject service
            ],
            imports: [
                RouterTestingModule,
                FormsModule,
                BrowserModule,
                HttpClientModule,
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
