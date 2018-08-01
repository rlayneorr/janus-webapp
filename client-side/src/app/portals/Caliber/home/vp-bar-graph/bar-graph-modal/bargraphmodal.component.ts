import {Component, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {Note} from '../../../entities/Note';

@Component({
    selector: 'app-bargraphmodal',
    templateUrl: './bargraphmodal.component.html',
    styleUrls: ['./bargraphmodal.component.css'],
})
export class BarGraphModalComponent implements OnInit {
    public modalInfoArray: any;
    public tech: Array<String>;
    public trainees: Array<Note>;
    public batchNotes: Note;

    constructor(public activeModal: NgbActiveModal) {
    }

    ngOnInit() {
    }
}
