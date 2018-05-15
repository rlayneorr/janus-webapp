import { Observable } from 'rxjs/Observable';
import { Associate } from '../../models/associate.model';
import { FormComponent } from './form.component';
import { AssociateService } from '../../services/associates-service/associates-service';
import { RequestService } from '../../services/request-service/request.service';
import { Injectable } from '@angular/core';
import { TestBed, ComponentFixture, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { NavbarComponent } from '../navbar/navbar.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { RouterTestingModule } from '@angular/router/testing';
// import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import 'rxjs/add/observable/of';
import { User } from '../../models/user.model';


import { AuthenticationService } from '../../services/authentication-service/authentication.service';
import { HttpModule } from '@angular/http';
import { Client } from '../../models/client.model';
import { By } from '@angular/platform-browser';
import { ToggleButton } from 'primeng/primeng';


describe('FormComponent', () => {
    let component: FormComponent;
    let fixture: ComponentFixture<FormComponent>;
    const testAssoService: AssociateService = new AssociateService(null, null);
    const testReqService: RequestService = new RequestService(null);
    const testAuthService: AuthenticationService = new AuthenticationService(null, null, null);
    const asso: Associate = new Associate();
    const fakeAsso: Associate = new Associate();
    const c1: Client = new Client();
    const c2: Client = new Client();
    const c3: Client = new Client();
    let cli: Array<Client>;
    beforeAll(() => {
        c1.name = 'revature';
        c2.name = 'infosys';
        c3.name = 'apple';
        cli = [c1, c2, c3];
        asso.associateId = 1;
        asso.associateFirstName = 'John';
        asso.associateLastName = 'Doe';
        asso.marketingStatusId = 2;
        asso.clientId = 3;
        asso.batchId = 4;
        asso.endClientId = 6;
        this.fakeAsso = asso;
        spyOn(testAssoService, 'getAssociate').and.returnValue(Observable.of(asso));
        spyOn(testReqService, 'getClients').and.returnValue(Observable.of(cli));
        //     const user: User = new User();
        // user.token = 'mockToken';
        // user.username = 'mockUser';
        // user.tfRoleId = 1;
        // spyOn(testAuthService, 'getUser').and.returnValue(user);  // needed by navbar
    });
    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [FormComponent, NavbarComponent],
            providers: [{ provide: AuthenticationService, useValue: testAuthService },
            { provide: RequestService, useValue: testReqService },
            { provide: AssociateService, useValue: testAssoService }],
            imports: [RouterTestingModule, FormsModule, HttpModule]
        });
        fixture = TestBed.createComponent(FormComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', inject([AssociateService, RequestService], (service: AssociateService, serv: RequestService) => {
        // expect(testReqService.getClients()).toContain('revature');
        expect(component).toBeTruthy();
    }));

    it('Form should contain mockAssociate we created', () => {
        expect(component.associate).toBe(this.fakeAsso);
    });

    it(' should contain "revature" in clients', () => {
        expect(component.clients).toContain(c1);
    });

});
