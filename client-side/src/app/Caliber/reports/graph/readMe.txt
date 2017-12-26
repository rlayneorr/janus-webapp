To use this component insert this html element:
<app-graph [data]="chartData | whatever the pipe will be named" [legend]=true [type]="chartType">test</app-graph>
*note the chartData will get piped later for formating so this will change.

Within the ts chartData is the varible that stores the rawdata from the service
chartType is the type of chart to display must string one of these strings {'line', 'radar', 'bar', 'doughnut'}