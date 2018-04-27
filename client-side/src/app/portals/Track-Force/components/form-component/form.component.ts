import { Component, OnInit } from '@angular/core';
import { AssociateService } from '../../services/associates-service/associates-service';
import { Associate } from '../../models/associate.model';
import { ClientListService } from '../../services/client-list-service/client-list.service';
import { Client } from '../../models/client.model';
import { element } from 'protractor';
import { ActivatedRoute } from '@angular/router';
import { AutoUnsubscribe } from '../../decorators/auto-unsubscribe.decorator';
import { RequestService } from '../../services/request-service/request.service';
import { HydraTrainee } from '../../../../hydra-client/entities/HydraTrainee';
import { DataScrollerModule } from 'primeng/primeng';
import { ENGINE_METHOD_DIGESTS } from 'constants';

/**
 * Component for viewing an individual associate and editing as admin.
 */
@Component({
    selector: 'app-form-comp',
    templateUrl: './form.component.html',
    styleUrls: ['./form.component.css']
})

@AutoUnsubscribe
export class FormComponent implements OnInit {
    associate: HydraTrainee = new HydraTrainee();
    clients: Client[];
    message = '';
    selectedMarketingStatus = null;
    selectedClient = null;
    id: number;

    constructor(private associateService: AssociateService, private requestService: RequestService) {
        const id = window.location.href.split('form-comp/')[1];
        this.id = Number(id);
        this.associateService.getAssociate(this.id).subscribe(
            data => {
                this.associate = data;
            }
        );
    }

    ngOnInit() {
        this.requestService.getClients().subscribe(data => { console.log(data); this.clients = data; });
    }

    /**
     * Update the associate with the new client and/or status
     */
    updateAssociate() {
        if (this.selectedMarketingStatus !== null) {
            this.associate.marketingStatus = this.selectedMarketingStatus;
        }
        if (this.selectedClient !== null) {
            this.associate.client = this.selectedClient;
        }
        this.associateService.updateAssociate(this.associate).subscribe(
            data => {
                this.associateService.getAssociate(this.id).subscribe(
                    data => {
                        this.associate = data;
                    }
                );
            }
        );
    }
}
