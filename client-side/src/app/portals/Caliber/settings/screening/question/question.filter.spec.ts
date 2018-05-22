import { TagFilterPipe } from './question.filter';
import { TAGS } from '../../../screening/mock-data/mock-tags';
import { Tag } from '../entities/Tag';

/**
   * Last modified by the Avengers
   *
   * Byron Hall | 1803-USF-MAR26 | Wezley Singleton
   *
   * Antonio Marrero Bonilla | 1803-USF-MAR26 | Wezley Singleton
   *
   */

   fdescribe('QuestionFilter', () => {
    const pipe = new TagFilterPipe();
    const fauxTag = new Tag();
    fauxTag.tagId = 1;
    fauxTag.tagName = 'HTML';
    it('should return an array of size 1', () => {
        expect(pipe.transform(TAGS, TAGS[0]).length).toBe(1);
    });
    it('should return an array of size 4', () => {
        expect(pipe.transform(TAGS, null).length).toBe(4);
    });
    it('should return null', () => {
        expect(pipe.transform(null, null)).toBeFalsy();
    });
    it('should return an array of size 0', () => {
        expect(pipe.transform(TAGS, fauxTag).length).toBe(0);
    });
   });
