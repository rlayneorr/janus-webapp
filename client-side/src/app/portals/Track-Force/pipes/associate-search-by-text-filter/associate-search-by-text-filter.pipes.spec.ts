import { AssociateSearchByTextFilter } from './associate-search-by-text-filter.pipes';
import { Associate } from '../../models/associate.model';
import { Client } from '../../models/client.model';



describe( 'TestPipe: AssociateSearchByTextFilterPipe', () => {
    let pipe: AssociateSearchByTextFilter;
    // creating mock data to be used in testing
    const test1 = new Associate();
    const test2 = new Associate();
    const test3 = new Associate();
    const cl = new Client();
    cl.id = 1;
    cl.name = 'infosys';
    test1.associateId = 1;
    test1.associateFirstName = 'Jose';
    test1.associateLastName = 'Tobon';
    test1.batchId = 1;
    test1.clientId = 1;
    test1.endClientId = 1;
    test1.marketingStatusId = 1;

    test2.associateId = 2;
    test2.associateFirstName = 'John';
    test2.associateLastName = 'Doe';
    test2.batchId = 1;
    test2.clientId = 1;
    test2.endClientId = 1;
    test2.marketingStatusId = 1;

    test3.associateId = 3;
    test3.associateFirstName = 'Blank';
    test3.associateLastName = 'Last';
    test3.batchId = 1;
    test3.clientId = 1;
    test3.endClientId = 1;
    test3.marketingStatusId = 1;
    const mockData: Associate[] = [test1, test2, test3];


    beforeEach(() => {
        pipe = new AssociateSearchByTextFilter();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it(' Should only display associates who contain "s" in one of their field', () => {
        expect(pipe.transform(mockData, 's')).toEqual([mockData[0], mockData[2]]);
    });

    it('Should display all Associates if no text is passed', () => {
        expect(pipe.transform(mockData, '')).toEqual(mockData);
    });

    it('should display no Associates since text passed is "z" which no associate contains', () => {
        expect(pipe.transform(mockData, 'z')).toEqual([]);
    });

    it('should display Associates who contain "DOE" ignoring case on any field',  () => {
        expect(pipe.transform(mockData, 'DOE')).toEqual([mockData[1]]);
    });

    it('should display associates with number 1 on a field', () => {
        expect(pipe.transform(mockData, '1')).toEqual(mockData);
    });

    it('should display no associates given text passed is "3 Doe"', () => {
        expect(pipe.transform(mockData, '3 Doe')).toEqual([]);
    });

});
