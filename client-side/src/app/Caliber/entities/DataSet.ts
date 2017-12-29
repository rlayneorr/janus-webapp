import { Component, OnInit } from '@angular/core';

export class DataSet {
    data: any[];
    label: any;
    fill: boolean;
    constructor() {
        this.data = [];
        this.fill = false;
    }

}
