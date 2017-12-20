import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Http } from '@angular/http';
import { CacheData } from '../entities/CacheData.entity';

@Injectable()
export class ReportingService {

  /* Subjects & Paired Observables */
  private traineeOverallTech = new BehaviorSubject<CacheData>(null);
  public traineeOverallTech$ = this.traineeOverallTech.asObservable();

  /*  Reports Charts */
  // Subjects used to store data from the server.
  private batchOverallRadarSubject = new BehaviorSubject<CacheData>(null);

  // Observables that are visible to subscribers to this service.
  batchOverallRadarChart = this.batchOverallRadarSubject.asObservable();

  constructor(private http: Http) { }

  /*  Reports Charts */
  refresh() {
    // Clear all data stored in subjects
    this.batchOverallRadarSubject.next(null);
  }

  /*
  =================================
          API CALLS
  =================================
  */

  /**
   * Fetch the batch comparison average script
   * @param skill - Skill to compare
   * @param training - Training
   * @param date - Date
   * @returns Number - batch average for comparison
   */
  fetchBatchComparisonAvg(skill: string, training: string, startDate) {
    const endpoint = environment.context + `/all/reports/compare/skill/${skill}/training/${training}/date/${startDate}`;

  }


  /* Doughnut / Pie charts */

  /**
   *
   * @param batchId batchId filter value
   * @param weekId weekId filter value
   */
  fetchBatchWeekPieChart(batchId: Number, weekId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/week/${weekId}/pie`;

    // TODO: Implement API call and subject push logic

  }


  fetchPieChartCurrentWeekQCStatus(batchId: Number) {
    const endpoint = environment.context + `all/reports/batch/{batchId}/chart`;

    // TODO: Implement API call and subject push logic

  }

  /* Stacked Bar Charts */

  fetchAllBatchesCurrentWeekQCStackedBarChart(batchId: Number, week: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/week/${week}/bar-batch-week-avg`;

    // TODO: Implement API call and subject push logic

  }

  /* Bar Charts */
  fetchBatchWeekAvgBarChart(batchId: Number, week: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/week/${week}/bar-batch-week-avg`;

    // TODO: Implement API call and subject push logic

  }

  fetchBatchWeekSortedBarChart(batchId: Number, week: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/week/${week}/bar-batch-weekly-sorted`;

    // TODO: Implement API call and subject push logic

  }

  fetchBatchOverallTraineeBarChart(batchId: Number, traineeId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/overall/trainee/${traineeId}/bar-batch-overall-trainee`;

    // TODO: Implement API call and subject push logic

  }

  fetchBatchOverallBarChart(batchId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/overall/bar-batch-overall`;

    // TODO: Implement API call and subject push logic

  }

  fetchBatchWeekTraineeBarChart(batchId: Number, weekId: Number, traineeId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/week/${weekId}/trainee/${traineeId}/bar-batch-week-trainee`;

    // TODO: Implement API call and subject push logic

  }

  /* Line Charts */
  fetchTraineeUpToWeekLineChart(batchId: Number, weekId: Number, traineeId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/week/${weekId}/trainee/${traineeId}/line-trainee-up-to-week`;

    // TODO: Implement API call and subject push logic

  }

  fetchTraineeOverallLineChart(batchId: Number, traineeId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/overall/trainee/${traineeId}/line-trainee-overall`;

    // TODO: Implement API call and subject push logic

  }

  fetchBatchOverallLineChart(batchId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/overall/line-batch-overall`;

    // TODO: Implement API call and subject push logic

  }

  fetchCurrentBatchesLineChart() {
    const endpoint = environment.context + `all/reports/dashboard`;

    // TODO: Implement API call and subject push logic

  }

  fetchCurrentPanelsLineChart() {
    const endpoint = environment.context = `all/reports/biweeklyPanelResults`;

    // TODO: Implement API call and subject push logic

  }

  /* Radar Charts */

  fetchTraineeUpToWeekRadarChart(week: Number, traineeId: Number) {
    const endpoint = environment.context + `all/reports/week/${week}/trainee/${traineeId}/radar-trainee-up-to-week`;

    // TODO: Implement API call and subject push logic

  }



  fetchTraineeOverallRadarChart(traineeId: Number) {
    const endpoint = environment.context + `all/reports/trainee/${traineeId}/radar-trainee-overall`;



  }

  fetchBatchOverallRadarChart(batchId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/overall/radar-batch-overall`;
    // Place the parameters into this object. Their names should match all the parameters given by the
    // method signature.
    const params = {
      batchId: batchId
    };

    // TODO: Implement API call and subject push logic
    if (!this.batchOverallRadarSubject.getValue() || this.batchOverallRadarSubject.getValue().params !== params) {

      // Obviously this will change based on which request is being made.
      // Replace the url and the subject being sent the result of the request.
      console.log(`Sending request to ${endpoint}`);
      this.http.get(endpoint).subscribe((success) => {
        console.log(`result: ${success.text()}`);
        const newData = {
            params: params,
            data: success.json()
        };
        this.batchOverallRadarSubject.next(newData);
      });
    }
  }

  fetchBatchAllTraineesRadarChart(batchId: Number) {
    const endpoint = environment.context + `all/reports/batch/${batchId}/radar-batch-all-trainees`;

    // TODO: Implement API call and subject push logic

  }

  /* Misc. */

  fetchBatchWeekAverageValue(batchId: Number, weekId: Number) {
    const endpoint = environment.context + `all/assessments/average/${batchId}/${weekId}`;

    // TODO: Implement API call and subject push logic

  }

  fetchTechnologiesForTheWeek(batchId: Number, weekId: Number) {
    const endpoint = environment.context + `all/assessments/categories/batch/${batchId}/${weekId}`;

    // TODO: Implement API call and subject push logic

  }
}
