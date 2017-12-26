import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'graphData' })
export class GraphDataPipe implements PipeTransform {
    transform(rawData: any[]): any {
        const labels = ['Test'];
        const output: any[] = [];
        for (let i = 0; i < rawData.length; i++) {
            output.push(this.dataSet(rawData[i], labels[i]));
            console.log(i);
        }
        // console.log(output);
        return output;
    }
    dataSet(rawData: any, label: string) {
        // console.log({ data: this.rawDatatoMap(rawData), label: label });
        return { data: this.rawDatatoMap(rawData), label: label };
    }
    rawDatatoMap(data: any) {
        const map = new Map();

        for (const key in data) {
            if (data.hasOwnProperty(key)) {
                map.set(key, data[key]);
            }
        }
        return map;
    }
}
