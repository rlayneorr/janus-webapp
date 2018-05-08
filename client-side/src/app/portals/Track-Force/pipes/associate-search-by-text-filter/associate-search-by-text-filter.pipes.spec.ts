import { AssociateSearchByTextFilter } from './associate-search-by-text-filter.pipes';
import { Associate } from '../../models/associate.model';
import { Client } from '../../models/client.model';



describe( 'TestPipe: AssociateSearchByTextFilterPipe', () => {
    let pipe: AssociateSearchByTextFilter;
    // creating mock data to be used in testing
// tslint:disable-next-line:class-name
class mockasso {
    userId: number;
    firstName: string;
    lastName: string;
    batchId: number;
    clientId: number;
    endClientId: number;
    marketingStatusId: number;
    marketingStatusName: string;
    client: string;
    marketingStatus: string;

}
const test1 = new mockasso ();
const test2 = new mockasso ();
const test3 = new mockasso ();
    test1.userId = 1;
    test1.firstName = 'click';
    test1.lastName = 'bait';
    test1.batchId = 1;
    test1.clientId = 1;
    test1.endClientId = 1;
    test1.marketingStatusId = 1;
    test1.marketingStatus = 'Mapped';
    test1.client = 'infosys';

    test2.userId = 2;
    test2.firstName = 'John';
    test2.lastName = 'Doe';
    test2.batchId = 1;
    test2.clientId = 1;
    test2.endClientId = 1;
    test2.marketingStatusId = 1;
    test2.marketingStatus = 'deployed';
    test2.client = 'revature';

    test3.userId = 3;
    test3.firstName = 'Blank';
    test3.lastName = 'Last';
    test3.batchId = 1;
    test3.clientId = 1;
    test3.endClientId = 1;
    test3.marketingStatusId = 1;
    test3.marketingStatus = 'none';
    test3.client = 'infosys';

    const mockData: mockasso[] = [test1, test2, test3];

    beforeEach(() => {
        pipe = new AssociateSearchByTextFilter();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it(' Should only display associates who contain "c" in one of their field', () => {
        console.log(mockData[0]);
        expect(pipe.transform(mockData, 'c')).toEqual([mockData[0]]);
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

    it('should display associates with number 1 on userID', () => {
        expect(pipe.transform(mockData, '1')).toEqual([mockData[0]]);
    });

    it('should display no associates given text passed is "3 Doe"', () => {
        expect(pipe.transform(mockData, '3 Doe')).toEqual([]);
    });

});
