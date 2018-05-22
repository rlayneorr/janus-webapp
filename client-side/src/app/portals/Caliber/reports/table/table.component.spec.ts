import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Dependencies } from '../../caliber.test.module';
import { TableComponent } from './table.component';

/**
 * To run these test, you must comment out everything from the ngOnInit() method
 */
xdescribe('TableComponent', () => {
  let component: TableComponent;
  let fixture: ComponentFixture<TableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule(Dependencies).compileComponents();
  }), 1440000);

  beforeEach(() => {
    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // Cannot verify incoming data due to API calls
  it('ngOnChange()', () => {
    const x = ['data'];
    component.ngOnChanges(x);
  });

  it('typeCheck(bar) should return a 4 if the data[1] is undefined', () => {
    component.tableType = 'bar';
    const data = new Array<any>();

    // Mimicking cachedData
    data.push({params: 4, data: 4});
    component.tableData = data;
    expect(component.typeCheck()).toEqual(4);
  });

  it('typeCheck(bar) should return a 3 if the data[1] is defined', () => {
    component.tableType = 'bar';
    const data = new Array<any>();

    // Micmicking cachedData
    data.push({params: 4, data: [4]});
    data.push({params: 6, data: 6});
    component.tableData = data;
    expect(component.typeCheck()).toEqual(3);
  });

  it('typeCheck(line) should return 2 if the length of tableData is greater than 1', () => {
    component.tableType = 'line';
    const data = new Array<any>();

    // Micmicking cachedData
    data.push({params: 4, data: 4});
    data.push({params: 6, data: 6});
    component.tableData = data;
    expect(component.typeCheck()).toEqual(2);
  });

  it('typeCheck(line) should return 1 if the length of tableData is 1', () => {
    component.tableType = 'line';
    const data = new Array<any>();

    // Micmicking cachedData
    data.push({params: 4, data: 4});
    component.tableData = data;
    expect(component.typeCheck()).toEqual(1);
  });

  it('typeCheck(any) should return 0', () => {
    component.tableType = 'any';
    const data = new Array<any>();

    // Micmicking cachedData
    data.push({params: 4, data: 4});
    data.push({params: 6, data: 6});
    component.tableData = data;
    expect(component.typeCheck()).toEqual(0);
  });

  it('numberSequence(4) should return [0, 1, 2, 3]', () => {
    const array = new Array();
    array.push(1);
    array.push(2);
    array.push(3);
    array.push(4);
    expect(component.numberSequence(4)).toEqual([0, 1, 2, 3]);
  });

  it('indexSequence(1) should return ', () => {
    const array = new Array();
    array.push('david');
    array.push('mythoua');
    array.push('jordan');
    array.push('chris');
    array.push('will');
    array.push('joel');
    component.tableLabels = array;
    expect(component.indexSequence(1)).toEqual([0, 1, 2, 3, 4, 5]);
  });
});
