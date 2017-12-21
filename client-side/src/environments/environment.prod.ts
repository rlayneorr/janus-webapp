export const environment = {
  production: true,
  context: 'http://localhost:8080/', // change for what the production environment would actually be

  /* Reporting service API endpoints */
  apiBatchComparisonAvgEndpoint: (skill: string, training: string, startDate) =>
    this.context + `/all/reports/compare/skill/${skill}/training/${training}/date/${startDate}`,

  apifetchBatchWeekPieChart: (batchId: Number, weekId: Number) =>
    this.context + `all/reports/batch/${batchId}/week/${weekId}/pie`,

  apiPieChartCurrentWeekQCStatus: (batchId: Number) =>
    this.context + `all/reports/batch/{batchId}/chart`,

  apiAllBatchesCurrentWeekQCStackedBarChart: (batchId: Number, week: Number) =>
    this.context + `all/reports/batch/${batchId}/week/${week}/bar-batch-week-avg`,

  apiBatchWeekAvgBarChart: (batchId: Number, week: Number) =>
    this.context + `all/reports/batch/${batchId}/week/${week}/bar-batch-week-avg`,

  apiBatchWeekSortedBarChart: (batchId: Number, week: Number) =>
    this.context + `all/reports/batch/${batchId}/week/${week}/bar-batch-weekly-sorted`,

  apiBatchOverallTraineeBarChart: (batchId: Number, traineeId: Number) =>
    this.context + `all/reports/batch/${batchId}/overall/trainee/${traineeId}/bar-batch-overall-trainee`,

  apiBatchOverallBarChart: (batchId: Number) =>
    this.context + `all/reports/batch/${batchId}/overall/bar-batch-overall`,

  apiBatchWeekTraineeBarChart: (batchId: Number, weekId: Number, traineeId: Number) =>
    this.context + `all/reports/batch/${batchId}/week/${weekId}/trainee/${traineeId}/bar-batch-week-trainee`,

  apiTraineeUpToWeekLineChart: (batchId: Number, weekId: Number, traineeId: Number) =>
    this.context + `all/reports/batch/${batchId}/week/${weekId}/trainee/${traineeId}/line-trainee-up-to-week`,

  apiTraineeOverallLineChart: (batchId: Number, traineeId: Number) =>
    this.context + `all/reports/batch/${batchId}/overall/trainee/${traineeId}/line-trainee-overall`,

  apiBatchOverallLineChart: (batchId: Number) =>
    this.context + `all/reports/batch/${batchId}/overall/line-batch-overall`,

  apiCurrentBatchesLineChart: this.context + 'all/reports/dashboard',
  apiCurrentPanelsLineChart: this.context + 'all/reports/biweeklyPanelResults',

  apiTraineeUpToWeekRadarChart: (week: Number, traineeId: Number) =>
    this.context + `all/reports/week/${week}/trainee/${traineeId}/radar-trainee-up-to-week`,

  apiTraineeOverallRadarChart: (traineeId: Number) =>
    this.context + `all/reports/trainee/${traineeId}/radar-trainee-overall`,

  apiBatchOverallRadarChart: (batchId: Number) =>
    this.context + `all/reports/batch/${batchId}/overall/radar-batch-overall`,

  apiBatchAllTraineesRadarChart: (batchId: Number) =>
    this.context + `all/reports/batch/${batchId}/radar-batch-all-trainees`,

  apiBatchWeekAverageValue: (batchId: Number, weekId: Number) =>
    this.context + `all/assessments/average/${batchId}/${weekId}`,

  apiTechnologiesForTheWeek: (batchId: Number, weekId: Number) =>
    this.context + `all/assessments/categories/batch/${batchId}/${weekId}`,
};
