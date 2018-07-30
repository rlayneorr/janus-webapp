import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {BarGraphModalComponent} from './bargraphmodal.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {OrderByPipe} from '../../../pipes/order-by.pipe';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';


describe('BarGraphModalComponent', () => {
    let component: BarGraphModalComponent;
    let fixture: ComponentFixture<BarGraphModalComponent>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [
                BarGraphModalComponent,
                OrderByPipe
            ],
            imports: [
                NgbModule.forRoot()
            ],
            providers: [
                NgbActiveModal
            ]
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(BarGraphModalComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
