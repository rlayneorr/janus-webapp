import { Batch } from '../../models/batch.model';
import { BamUser } from '../../models/bamuser.model';
import { Schedule } from '../../models/schedule.model';
import { Curriculum } from '../../models/curriculum.model';
import { Subtopic } from '../../models/subtopic.model';
import { Topic } from '../../models/topic.model';

export class BoomUtil {
    static makeBatches(): Batch[] {
        const newBatches: Batch[] = [];
        let id = 0; // Type: number
        let date = 9000; // Type: number
        let startDate: Date = new Date(date);

        newBatches.push(new Batch(id++, '', startDate, startDate, this.getUserById(1), 0, 0));
        startDate = new Date(++date);

        newBatches.push(new Batch(id++, '', startDate, startDate, this.getUserById(1), 0, 0));
        startDate = new Date(++date);

        newBatches.push(new Batch(id++, '', startDate, startDate, this.getUserById(1), 0, 0));
        startDate = new Date(++date);

        newBatches.push(new Batch(id++, '', startDate, startDate, this.getUserById(1), 0, 0));
        startDate = new Date(++date);

        return newBatches;
      }

      static getUserById(id: number): BamUser {
            const user: BamUser = new BamUser(id, '', '', '', '',
                '' , 0, null, '', '', '', '', 0);
            return user;
      }

      static getScheduleById(id: number): Schedule {
          return new Schedule(id, [], new Curriculum());
      }

      static getSubtopicById(id: number): Subtopic {
          return new Subtopic(id, '', new Date(10000), new Date(10000), '', new Topic());
      }
}
