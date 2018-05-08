import { Associate } from '../../models/associate.model';
import { TestBed, inject, async, tick, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { AssociateService } from './associates-service';
import { HttpClient, HttpHandler, HttpClientModule, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { assertNotNull } from '@angular/compiler/src/output/output_ast';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

 describe('AssociateService', () => {
    // tslint:disable:prefer-const
    let associate = new Associate();
    let asso2 = new Associate();
    let assoList = new Array<Associate>();
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AssociateService, HttpClient, HttpHandler],
            imports: [HttpClientModule, HttpClientTestingModule]

        });
    });

    beforeAll(() => {
        associate.associateId = 1;
        associate.associateFirstName = 'John';
        associate.associateLastName = 'Doe';
        associate.batchId = 1;
        associate.clientId = 1;
        associate.endClientId = 1;
        associate.marketingStatusId = 1;

        assoList.push(associate);

        asso2.associateId = 2;
        asso2.associateFirstName = 'First';
        asso2.associateLastName = 'Last';
        asso2.batchId = 1;
        asso2.clientId = 2;
        asso2.endClientId = 2;
        asso2.marketingStatusId = 1;


        assoList.push(asso2);
    });

    it('should create', inject([AssociateService], (serv: AssociateService) => {
        expect(serv).toBeTruthy();
    }));

    // testing getAssociate(id: number)
    it('should grab associate with id 1', inject([AssociateService], (serv: AssociateService) => {
        spyOn( serv, 'getAssociate').and.returnValue(Observable.of(associate));
        serv.getAssociate(1).subscribe(data => expect(data).toEqual(assoList[0]));

    }));

    // testing  getAllAssociates
    it('should get all associates', inject([AssociateService], (serv: AssociateService) => {
        // console.log(assoList);
        spyOn( serv, 'getAllAssociates').and.returnValue(Observable.of(assoList));
        serv.getAllAssociates().subscribe(data => expect(data).toContain(associate));
        expect(serv.getAllAssociates).toHaveBeenCalled();

    }));

    // testing update associate
    // fix this, works with hyddratrainee do not know if i should fix this or not
//     it('Should update associate with id 2', inject([AssociateService], (serv: AssociateService) => {
//         let asso = new Associate();
//         asso.associateId = 2;
//         asso.associateFirstName = 'First';
//         asso.associateLastName = 'Last';
//         asso.batchId = 1;
//         asso.clientId = 2;
//         asso.endClientId = 2;
//         asso.marketingStatusId = 1;
//         console.log(asso);
//         console.log(asso2);
//          spyOn(serv, 'updateAssociate').and.returnValue(Observable.of(asso));
//          console.log(Observable.of(asso));
//          serv.updateAssociate(asso2.id, 'mocks', 'rev').subscribe(data => expect(data).toEqual(asso));
//          expect(serv.updateAssociate).toHaveBeenCalled();
//   }));
    // No need for testing multiple associates being updated at the same time.

});
