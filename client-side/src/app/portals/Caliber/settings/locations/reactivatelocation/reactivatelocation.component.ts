import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {LocationService} from '../../../services/location.service';
import {Location} from '../../../entities/Location';

@Component({
    selector: 'app-reactivatelocation',
    templateUrl: './reactivatelocation.component.html',
    styleUrls: ['./reactivatelocation.component.css'],
    encapsulation: ViewEncapsulation.None,
})
export class ReactivateLocationComponent implements OnInit {
    @Input()
    location: Location;

    constructor(private modalService: NgbModal, private ls: LocationService) {
    }

    ngOnInit() {

    }

    /**
     * open up the modal with prompt
     *
     * @param {any} content
     * @memberof ReactivateLocationComponent
     */
    showModal(content) {
        this.modalService.open(content);
    }

    /**
     * reactivate the location by setting active to true
     *
     * @memberof ReactivateLocationComponent
     */
    reactivateLocation() {
        this.location.active = true;
        this.ls.reactivate(this.location).subscribe();
    }
}
