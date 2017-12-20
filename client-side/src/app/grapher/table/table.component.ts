
import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html'
})

export class TableComponent implements OnInit, OnChanges {
    @Input() data: any;
    @Input() type: string;

    public tableMaps: any = null;
    public tableData: any[] = null;
    public tableLabels: any[] = null;
    public tableType: string = null;
    public dataIndexes: number[] = [];
    ngOnInit() {
        this.tableMaps = this.data;
        this.tableType = this.type;

        const _tableData: any[] = [];
        const _tableLabels: string[] = [];
        let label = true;
        // gets data from input
        for (const tableMap of this.tableMaps) {
            const _tableDataRow: number[] = [];
            tableMap.data.forEach((value: number, key: string) => {
                _tableDataRow.push(value);
                if (label) {
                    _tableLabels.push(key);
                }
            });
            label = false;
            _tableData.push({ data: _tableDataRow, label: tableMap.label });
        }
        if (this.tableType === 'line') {
            for (let i = 0; i < _tableLabels.length; i++) {
                _tableLabels[i] = 'Week ' + _tableLabels[i];
            }
        }
        this.tableData = _tableData;
        this.tableLabels = _tableLabels;
        for (let i = 0; i < this.tableLabels.length; i++) {
            this.dataIndexes.push(i);
        }
    }
    ngOnChanges() {

    }
    lineGraphCheck() {
        return (this.tableType === 'line' && this.tableData.length > 1);
    }
}
