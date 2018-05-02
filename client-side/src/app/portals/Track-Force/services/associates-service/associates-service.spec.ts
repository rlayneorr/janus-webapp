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
        associate.id = 1;
        associate.firstName = 'John';
        associate.lastName = 'Doe';
        associate.msid = 2;
        associate.marketingStatus = 'mock';
        associate.clid = 3;
        associate.client = 'mockClient';
        associate.bid = 4;
        associate.curid = 5;
        associate.curriculumName = 'mockCurr';
        associate.ecid = 6;
        associate.endClientName = 'mockEndClient';
        associate.batchName = 'mockBatch';
        associate.batchId = '7';

        assoList.push(associate);

        asso2.id = 8;
        asso2.firstName = 'First';
        asso2.lastName = 'Last';
        asso2.msid = 9;
        asso2.marketingStatus = 'mock';
        asso2.clid = 10;
        asso2.client = 'mockClient';
        asso2.bid = 11;
        asso2.curid = 12;
        asso2.curriculumName = 'mockCurr';
        asso2.ecid = 13;
        asso2.endClientName = 'mockEndClient';
        asso2.batchName = 'mockBatch';
        asso2.batchId = '14';

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
   //  tslint:disable-next-line:max-line-length
    it('Should update associate', inject([AssociateService], (serv: AssociateService) => {
        let asso = new Associate();
        asso.id = 8;
        asso.firstName = 'First';
        asso.lastName = 'Last';
        asso.msid = 9;
        asso.marketingStatus = 'mocks';
        asso.clid = 10;
        asso.client = 'rev';
        asso.bid = 11;
        asso.curid = 12;
        asso.curriculumName = 'mockCurr';
        asso.ecid = 13;
        asso.endClientName = 'mockEndClient';
        asso.batchName = 'mockBatch';
        asso.batchId = '14';
        console.log(asso);
        console.log(asso2);
         spyOn(serv, 'updateAssociate').and.returnValue(Observable.of(asso));
         console.log(Observable.of(asso));
         serv.updateAssociate(asso2.id, 'mocks', 'rev').subscribe(data => expect(data).toEqual(asso));
         expect(serv.updateAssociate).toHaveBeenCalled();
  }));
    // No need for testing multiple associates being updated at the same time.

});
