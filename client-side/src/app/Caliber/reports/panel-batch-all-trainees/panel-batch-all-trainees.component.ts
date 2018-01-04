import { Component, OnInit } from '@angular/core';
import { PanelReview } from '../../entities/PanelReview';
import { Subscription } from 'rxjs/Subscription';
import { ReportingService } from '../../../services/reporting.service';
import { GranularityService } from '../services/granularity.service';


/**
 * Component utilizes service API calls to fetch and display the results of
 * panel interviews for a provided batch.
 *
 * @author Mitch Goshorn
 */
@Component({
  selector: 'app-panel-batch-all-trainees',
  templateUrl: './panel-batch-all-trainees.component.html',
  styleUrls: ['./panel-batch-all-trainees.component.css']
})
export class PanelBatchAllTraineesComponent implements OnInit {

  private batchIdSub: Subscription;
  batchId: number = null;

  public data: Array<PanelReview> = null;
  public headings: Array<String> = null;
  private dataSubscription: Subscription;

  constructor(private reportsService: ReportingService, private granularityService: GranularityService) { }

  ngOnInit() {
    this.dataSubscription = this.reportsService.panelBatchAllTrainees$
      .subscribe((result) => {
        if  (result) {
          this.data = result.data;
        } else {
          console.log('Panel data failed to load');
        }
      });

    this.batchIdSub = this.granularityService.currentBatch$.subscribe((result) => {
      if (this.batchId !== result.batchId) {
        this.batchId = result.batchId;
        this.reportsService.fetchPanelBatchAllTrainees(this.batchId);
      }
    });
  }
}
