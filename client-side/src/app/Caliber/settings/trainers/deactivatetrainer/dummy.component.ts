import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Input } from '@angular/core/';
import { Http } from '@angular/http';
import { NgbModalRef } from '@ng-bootstrap/ng-bootstrap/modal/modal-ref';
import { Trainer } from '../../../beans/Trainer';
import { TrainerService } from '../../../services/trainer.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'app-dummy',
    templateUrl: './dummy.component.html',
    styleUrls: ['./deactivatetrainer.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class DummyComponent implements OnInit {
    trainers: Array<Trainer>;

    constructor(private http: Http, private modalService: NgbModal) {
    }

    ngOnInit() {
        this.http.get('http://localhost:8080/all/trainer/all', { withCredentials: true }).subscribe(
            (successResp) => {
                this.trainers = successResp.json();
                console.log(this.trainers);
            },
            (failResp) => {
                console.log('fail');
            }
        );
    }
}
