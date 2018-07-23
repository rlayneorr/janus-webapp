// Filters


// Mock Data
// import { TAGS } from '../../../screening/mock-data/mock-tags';

// Entities


/**
 * Tests for the question filters.
 *
 * @author Antonio Marrero Bonilla | 1803-USF-MAR26 | Wezley Singleton
 *
 * @author Byron Hall | 1803-USF-MAR26 | Wezley Singleton
 **/

/**
* Setting up the testing environment for question filters.
**/
describe('QuestionFilter', () => {
    // const pipe = new TagFilterPipe();
  

    /**
     * Test if it returns an array of size 1.
     *
     * Function tested: transform()
     */
    it('should return an array of size 1', () => {
        // expect(pipe.transform(TAGS, TAGS[0]).length).toBe(1);
    });

    /**
     * Test if it returns an array of size 4.
     *
     * Function tested: transform()
     */
    it('should return an array of size 4', () => {
        // expect(pipe.transform(TAGS, null).length).toBe(4);
    });

    /**
     * Test if it returns null.
     *
     * Function tested: transform()
     */
    it('should return null', () => {
        // expect(pipe.transform(null, null)).toBeFalsy();
    });

    /**
     * Test if it returns an array of size 0.
     *
     * Function tested: transform()
     */
    it('should return an array of size 0', () => {
        // expect(pipe.transform(TAGS, fauxTag).length).toBe(0);
    });
});
