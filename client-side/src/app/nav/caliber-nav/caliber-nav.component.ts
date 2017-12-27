import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-caliber-nav',
  templateUrl: './caliber-nav.component.html',
  styleUrls: ['./caliber-nav.component.css']
})
export class CaliberNavComponent implements OnInit {
  @Input()
  collapsed = false;

  @Output()
  collapse: EventEmitter<any> = new EventEmitter<any>();
  constructor() { }

  ngOnInit() {
  }

  toggleCollapse() {
    this.collapsed = !this.collapsed;
    this.collapse.emit(this.collapsed);
  }
}
