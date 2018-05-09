import { AssociateSearchByTextFilter } from './associate-search-by-text-filter.pipes';
import { Associate } from '../../models/associate.model';

describe( 'TestPipe: AssociateSearchByTextFilterPipe', () => {
    let pipe: AssociateSearchByTextFilter;
    // creating mock data to be used in testing
    const test1 = new Associate();
    const test2 = new Associate();
    const test3 = new Associate();
    test1.id = 1;
    test1.firstName = 'Jose';
    test1.lastName = 'Tobon';
    test1.marketingStatus = 'Mapped:Training';
    test1.client = 'Revature';
    test2.id = 2;
    test2.firstName = 'John';
    test2.lastName = 'Doe';
    test2.marketingStatus = 'Mapped:Reserved';
    test2.client = 'Infosys';
    test3.id = 3;
    test3.firstName = 'Jane';
    test3.lastName = 'Doe';
    test3.marketingStatus = 'UnMapped:Open';
    test3.client = 'none';
    const mockData: Associate[] = [test1, test2, test3];

    beforeEach(() => {
        pipe = new AssociateSearchByTextFilter();
    });

    it('create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it(' Should only display associates who contain "s" in one of their field', () => {
        expect(pipe.transform(mockData, 's')).toEqual([mockData[0], mockData[1]]);
    });

    it('Should display all Associates if no text is passed', () => {
        expect(pipe.transform(mockData, '')).toEqual(mockData);
    });

    it('should display no Associates since text passed is "z" which no associate contains', () => {
        expect(pipe.transform(mockData, 'z')).toEqual([]);
    });

    it('should display Associates who contain "DOE" ignoring case on any field',  () => {
        expect(pipe.transform(mockData, 'DOE')).toEqual([mockData[1], mockData[2]]);
    });

    it('should display associates with number 1 on a field', () => {
        expect(pipe.transform(mockData, '1')).toEqual([mockData[0]]);
    });

    it('should display no associates given text passed is "3 Doe"', () => {
        expect(pipe.transform(mockData, '3 Doe')).toEqual([]);
    });

});
