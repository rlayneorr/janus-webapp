import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {Observable} from 'rxjs/Observable';
import {ReportingService} from '../../services/reporting.service';
import {PDFService} from '../../services/pdf.service';
import {GranularityService} from '../services/granularity.service';
import {GambitTrainee} from '../../../../caliber-client/entities/GambitTrainee';


/**
 * @author John Hudson
*/
@Component({
    selector: 'app-weekly-cumulative-skills',
    templateUrl: './weekly-cumulative-scores.component.html',
    styleUrls: ['./weekly-cumulative-scores.component.css']
})
export class WeeklyCumulativeScoreComponent implements OnInit, OnDestroy {

    // chart data sub
    private BatchWeekSortedBarChart: Subscription;

    // relevent granularity subs
    private batchSubscription: Subscription;
    private weekSubscription: Subscription;

    // when batch or week change do this
    private BatchWeekChange: Subscription;


    public week: number;
    public trainee: GambitTrainee;
    public batchId: number;

    public chartData: any[] = [];
    public dataSetLabels: string[] = ['Batch Scores'];
    public chartType = 'bar';

    constructor(private reportsService: ReportingService, private pdfService: PDFService,
        private granularityService: GranularityService) { }

    ngOnInit() {
        // chart data
        this.BatchWeekSortedBarChart = this.reportsService.BatchWeekSortedBarChart$.subscribe((result) => {
            if (result) {
                if (this.batchId === result.params.batchId && this.week === result.params.week) {
                    this.chartData = [this.sortResult(result.data)];
                }
            }
        });
        // granulity week sub
        this.weekSubscription = this.granularityService.currentWeek$.subscribe(
            (result) => {
                if (result !== this.week) {
                    this.week = result;
                }
            });

        // granularity batch sub
        this.batchSubscription = this.granularityService.currentBatch$.subscribe(
            (result) => {
                if (result.batchId !== this.batchId) {
                    this.batchId = result.batchId;
                }
            });

        this.BatchWeekChange = Observable.combineLatest(this.granularityService.currentBatch$,
            this.granularityService.currentWeek$).subscribe(
            () => {
                this.reportsService.fetchBatchWeekSortedBarChart(this.batchId, this.week);
            }
            );
    }
    ngOnDestroy() {
        this.BatchWeekSortedBarChart.unsubscribe();

        this.BatchWeekChange.unsubscribe();

        this.weekSubscription.unsubscribe();
        this.batchSubscription.unsubscribe();
    }
    /**
     * takes in the result dataset and returns a sorted version of the object
     * @param result
     */
    sortResult(result: any): any {
        const objArr = Object.entries(result);
        for (let i = 0; i < objArr.length; i++) {
            for (let j = i + 1; j < objArr.length; j++) {
                if (objArr[i][1] < objArr[j][1]) {
                    const swap = objArr[j];
                    objArr[j] = objArr[i];
                    objArr[i] = swap;
                }
            }
        }
        // make a new object from the array
        result = {};
        for (let i = 0; i < objArr.length; i++) {
            result[objArr[i][0]] = objArr[i][1];
        }
        return result;
    }

    /**
     * downloads pdf via pdf service
     */
    downloadPDF() {
        this.pdfService.downloadPDF('cumulative-skills');
    }
}
