import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { CacheData } from '../entities/CacheData.entity';
import { HttpClient } from '@angular/common/http';



/**
 * Service handles API calls and tracks fetched data for caching.
 * Fetched data is exposed by observables which get data from private
 * BehaviorSubjects.
 *
 * @author Mitch Goshorn
 * @author Micah West
 */
@Injectable()
export class ReportingService {

  /* Subjects & Paired Observables */


  /*  Reports Charts */
  private traineeOverallRadar = new BehaviorSubject<CacheData>(null);
  public traineeOverallRadar$ = this.traineeOverallRadar.asObservable();

  private batchOverallRadar = new BehaviorSubject<CacheData>(null);
  public batchOverallRadar$ = this.batchOverallRadar.asObservable();

  // Bar Chart
  private batchOverallBar = new BehaviorSubject<CacheData>(null);
  public batchOverallBar$ = this.batchOverallBar.asObservable();

  constructor(private httpClient: HttpClient) { }

  /**
   * Clear all data stored in subjects.
   */
  refresh() {
    // Clear all data stored in subjects
    this.traineeOverallRadar.next(null);
    this.batchOverallRadar.next(null);
    this.batchOverallBar.next(null);
  }

  /**
   * Returns true or false if BehaviorSubject needs to be refreshed.
   * @param sub
   * @param params
   */
  private needsRefresh(sub: BehaviorSubject<CacheData>, params: any): boolean {
    return !sub.getValue() || sub.getValue().params !== params;
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
    const endpoint = environment.apiBatchComparisonAvgEndpoint(skill, training, startDate);

  }


  /* Doughnut / Pie charts */

  /**
   *
   * @param batchId batchId filter value
   * @param weekId weekId filter value
   */
  fetchBatchWeekPieChart(batchId: Number, weekId: Number) {
    const endpoint = environment.apifetchBatchWeekPieChart(batchId, weekId);

    // TODO: Implement API call and subject push logic

  }


  fetchPieChartCurrentWeekQCStatus(batchId: Number) {
    const endpoint = environment.apiPieChartCurrentWeekQCStatus(batchId);

    // TODO: Implement API call and subject push logic

  }

  /* Stacked Bar Charts */

  fetchAllBatchesCurrentWeekQCStackedBarChart(batchId: Number, week: Number) {
    const endpoint = environment.apiAllBatchesCurrentWeekQCStackedBarChart(batchId, week);

    // TODO: Implement API call and subject push logic

  }

  /* Bar Charts */
  fetchBatchWeekAvgBarChart(batchId: Number, week: Number) {
    const endpoint = environment.apiBatchWeekAvgBarChart(batchId, week);

    // TODO: Implement API call and subject push logic

  }

  fetchBatchWeekSortedBarChart(batchId: Number, week: Number) {
    const endpoint = environment.apiBatchWeekSortedBarChart(batchId, week);

    // TODO: Implement API call and subject push logic

  }

  fetchBatchOverallTraineeBarChart(batchId: Number, traineeId: Number) {
    const endpoint = environment.apiBatchOverallTraineeBarChart(batchId, traineeId);

    // TODO: Implement API call and subject push logic

  }

  /**
   * Fetches overall batch for Cumulative Scores bar chart.
   * @param batchId - batch whose cumulative score data should be fetched
   * @author Edel Benavides
   */
  fetchBatchOverallBarChart(batchId: Number) {
    const endpoint = environment.apiBatchOverallBarChart(batchId);

    // Params object for refresh check
    const params = {
      batchId: batchId
    };

    // call backend API if data is not fresh
    if (this.needsRefresh(this.batchOverallBar, params)) {
      this.httpClient.get(endpoint).subscribe(
        success => this.batchOverallBar.next({params: params, data: success}));
    }

  }

  fetchBatchWeekTraineeBarChart(batchId: Number, weekId: Number, traineeId: Number) {
    const endpoint = environment.apiBatchWeekTraineeBarChart(batchId, weekId, traineeId);

    // TODO: Implement API call and subject push logic

  }

  /* Line Charts */
  fetchTraineeUpToWeekLineChart(batchId: Number, weekId: Number, traineeId: Number) {
    const endpoint = environment.apiTraineeUpToWeekLineChart(batchId, weekId, traineeId);

    // TODO: Implement API call and subject push logic

  }

  fetchTraineeOverallLineChart(batchId: Number, traineeId: Number) {
    const endpoint = environment.apiTraineeOverallLineChart(batchId, traineeId);

    // TODO: Implement API call and subject push logic

  }

  fetchBatchOverallLineChart(batchId: Number) {
    const endpoint = environment.apiBatchOverallLineChart(batchId);

    // TODO: Implement API call and subject push logic

  }

  fetchCurrentBatchesLineChart() {
    const endpoint = environment.apiCurrentBatchesLineChart;

    // TODO: Implement API call and subject push logic

  }

  fetchCurrentPanelsLineChart() {
    const endpoint = environment.apiCurrentPanelsLineChart;

    // TODO: Implement API call and subject push logic

  }

  /* Radar Charts */

  fetchTraineeUpToWeekRadarChart(week: Number, traineeId: Number) {
    const endpoint = environment.apiTraineeUpToWeekRadarChart(week, traineeId);

    // TODO: Implement API call and subject push logic

  }


  /**
   * Updates Trainee overall tech skills data if necessary
   * Data can be subscribed to @ traineeOverallRadar$
   * @param traineeId - trainee whose skill data should be fetched
   */
  fetchTraineeOverallRadarChart(traineeId: Number) {
    const endpoint = environment.apiTraineeOverallRadarChart(traineeId);

    // Params object for refresh check
    const params = {
      traineeId: traineeId
    };

    // call backend API if data is not fresh
    if (this.needsRefresh(this.traineeOverallRadar, params)) {
      this.httpClient.get(endpoint).subscribe(
        success => this.traineeOverallRadar.next({params: params, data: success}));
    }
  }

  /**
   * Updates Batch overall tech skills data if necessary
   * Data can be subscribed to @ batchOverallRadar$
   * @param batchId - batch whose skill data should be fetched
   */
  fetchBatchOverallRadarChart(batchId: Number) {

    const endpoint = environment.apiBatchOverallRadarChart(batchId);

    // Params object for refresh check
    const params = {
      batchId: batchId
    };

    // call backend API if data is not fresh
    if (this.needsRefresh(this.batchOverallRadar, params)) {
      this.httpClient.get(endpoint).subscribe(
        success => this.batchOverallRadar.next({params: params, data: success}));
    }
  }

  fetchBatchAllTraineesRadarChart(batchId: Number) {
    const endpoint = environment.apiBatchAllTraineesRadarChart(batchId);

    // TODO: Implement API call and subject push logic

  }

  /* Misc. */

  fetchBatchWeekAverageValue(batchId: Number, weekId: Number) {
    const endpoint = environment.apiBatchWeekAverageValue(batchId, weekId);

    // TODO: Implement API call and subject push logic

  }

  fetchTechnologiesForTheWeek(batchId: Number, weekId: Number) {
    const endpoint = environment.apiTechnologiesForTheWeek(batchId, weekId);

    // TODO: Implement API call and subject push logic

  }
}
