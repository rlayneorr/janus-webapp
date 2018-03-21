/**
* This model is used to hold data that is passed into the schedule (calendar) api to render the title with the date
* @author Sean Sung | Batch: 1712-dec10-java-steve
*/

export class CalendarEvent {
    subtopicNameId: number;
    subtopicId: number;
    title: string;
    start: Date;
    status: string;
    color: string;
    constructor() { }
}
