import { Injectable, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subtopic } from '../models/subtopic.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TopicWeek } from '../models/topicweek.model';
import { TopicName } from '../models/topicname.model';
import { CalendarEvent } from '../models/calendar-event.model';
import { environment } from '../../../../environments/environment';
import { of } from 'rxjs/observable/of';
import { CalendarStatusService } from './calendar-status.service';


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  observe: 'response' as 'response'
};

@Injectable()
export class CalendarService {
  @Output()
  addCalendarEvent = new EventEmitter<CalendarEvent>();

  constructor(private http: HttpClient, private statusService: CalendarStatusService) { }

  /**
   * Gets subtopics by batch and uses pagination to limit the results
   * apposed to getting them all at one time
   * @author James Holzer Jordan DeLong| Batch: 1712-dec10-java-steve
   * @returns SubTopic[]
   * @param batchId number
   * @param pageNumber: number
   * @param pageSize: number
   */
  getSubtopicsByBatchPagination(batchId: number, pageNumber: number, pageSize: number): Observable<Subtopic[]> {
    return this.http.get<Subtopic[]>(environment.calendar.getSubtopicsByBatchPaginationUrl(batchId, pageNumber, pageSize)).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Retrieves subtopic by batchId
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns SubTopic[]
   * @param batchId number
   */
  getSubtopicsByBatch(batchId: number): Observable<Subtopic[]> {
    return this.http.get<Subtopic[]>(environment.calendar.getSubtopicsByBatchUrl(batchId)).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Retrieves the number of subtopics by batchId
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns number
   * @param batchId number
   */
  getNumberOfSubTopicsByBatch(batchId: number): Observable<number> {
    return this.http.get<number>(environment.calendar.getNumberOfSubTopicsByBatchUrl(batchId)).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Retrieves the topics by batchId into a TopicWeek for a given week
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns TopicWeek
   * @param batchId number
   */
  getTopicsByBatchPag(batchId: number): Observable<TopicWeek> {
    return this.http.get<TopicWeek>(environment.calendar.getTopicsByBatchPagUrl(batchId)).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Changes the subtopic date
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns
   * @param subtopicId number
   * @param batchId: number
   * @param status: number
   */
  changeTopicDate(subtopicId: number, batchId: number, date: number) {
    return this.http.post(environment.calendar.changeTopicDateUrl(subtopicId, batchId, date), null, httpOptions).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Updates the topic's status
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns
   * @param subtopicId number
   * @param batchId: number
   * @param status: number
   */
  updateTopicStatus(calendarEvent: CalendarEvent, batchId: number): Observable<any> {
    return this.http.get(environment.calendar.updateTopicStatusUrl(calendarEvent.subtopicId, batchId, calendarEvent.status))
      .map(data => {
        return data;
      }
    );
  }

  /**
   * Add a topic to a days
   * @author James Holzer | Batch: 1712-dec10-java-steve
   * @returns
   * @param topics: TopicName[]
   */
  addTopics(topics: TopicName[]) {
    return this.http.post(environment.calendar.addTopicsUrl(), topics, httpOptions).map(
      data => {
        return data;
      }
    );
  }

  /**
   * Adds subtopic sent from the add-subtopic component and emits it to the calendar component
   * @param subtopic
   * @author Sean Sung | Batch: 1712-dec10-java-steve
   */
  addSubtopicToCalendar(subtopic: Subtopic) {
    const newCalendarSubtopic = this.mapSubtopicToEvent(subtopic);
    this.addCalendarEvent.emit(newCalendarSubtopic);
  }

  /**
   * maps Subtopic object to CalendarEvent object
   * @param subtopic
   * @author Sean Sung | Batch: 1712-dec10-java-steve
   */
  mapSubtopicToEvent(subtopic: Subtopic): CalendarEvent {
    const calendarEvent = new CalendarEvent();
    calendarEvent.subtopicNameId = subtopic.subtopicName.id;
    calendarEvent.subtopicId = subtopic.subtopicId;
    calendarEvent.title = subtopic.subtopicName.name;
    calendarEvent.start = new Date(subtopic.subtopicDate);
    calendarEvent.status = subtopic.status.name;
    calendarEvent.color = this.statusService.getStatusColor(calendarEvent.status);

    return calendarEvent;
  }
}
