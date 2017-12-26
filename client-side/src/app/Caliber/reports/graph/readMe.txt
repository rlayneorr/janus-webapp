To use this component insert this html element:
<app-graph  *ngIf="chartData" [data]="(chartData | graphData:dataSetLabels)" [legend]=true [type]="chartType"></app-graph>

chartData is an array of datasets. [dataset 1,dataset 2 . . .]
each dataset is the raw return from the service
the pipe 'graphData' in the example takes the raw data from the service and formats it.
dataSetLabels is an array that is the label for each dataset

chartType is the type of chart to display must string one of these strings {'line', 'radar', 'bar', 'doughnut'}

Tables follow the same format.